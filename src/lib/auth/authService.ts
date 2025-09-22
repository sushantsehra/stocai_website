import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { AuthResponse, SignUpData, SignInData } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000';

// Type for API request data
interface APIRequestData {
  [key: string]: unknown;
}

// Type for error responses from the API
interface APIErrorResponse {
  detail?: string;
  message?: string;
}

export class AuthService {
  private static async makeAPIRequest(endpoint: string, data: APIRequestData): Promise<AuthResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    try {
      console.log(`Making API request to: ${API_BASE_URL}${endpoint}`);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        let errorData: APIErrorResponse;
        try {
          errorData = JSON.parse(errorText) as APIErrorResponse;
        } catch {
          errorData = { detail: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData as AuthResponse;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      console.error('API Request Error:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout. Please try again.');
        }
        
        if (error.name === 'TypeError' || error.message.includes('fetch')) {
          throw new Error('Unable to connect to server. Working in offline mode.');
        }
        
        if (error.message.includes('ERR_CONNECTION_REFUSED') || 
            error.message.includes('ECONNREFUSED') ||
            error.message.includes('Failed to fetch')) {
          throw new Error('Server unavailable. Authentication will work offline.');
        }
        
        throw new Error(error.message || 'Network error occurred');
      }
      
      throw new Error('An unexpected error occurred');
    }
  }

  static async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      // Create user with Firebase first
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        data.email, 
        data.password
      );

      // Get Firebase ID token
      const idToken = await userCredential.user.getIdToken();

      // Try to send to backend, but don't fail if it's unavailable
      try {
        const response = await this.makeAPIRequest('/signup', {
          id_token: idToken,
          full_name: data.fullName,
          email: data.email,
        });
        return response;
      } catch (apiError: unknown) {
        const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown error';
        console.warn('Backend signup unavailable, using Firebase data:', errorMessage);
        
        // Return Firebase-based response
        const [firstName, ...lastNameParts] = data.fullName.trim().split(' ');
        return {
          user_id: userCredential.user.uid,
          firstName: firstName || data.fullName,
          lastName: lastNameParts.join(' ') || '',
          email: data.email,
          message: 'Account created successfully'
        };
      }
    } catch (error: unknown) {
      throw this.handleFirebaseError(error);
    }
  }

  static async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      // Sign in with Firebase first
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Get Firebase ID token
      const idToken = await userCredential.user.getIdToken();

      // Try to send to backend, but don't fail if it's unavailable
      try {
        const response = await this.makeAPIRequest('/signin', {
          id_token: idToken,
          email: data.email,
        });
        return response;
      } catch (apiError: unknown) {
        const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown error';
        console.warn('Backend signin unavailable, using Firebase data:', errorMessage);
        
        // Return Firebase-based response
        const displayName = userCredential.user.displayName || data.email.split('@')[0];
        const [firstName, ...lastNameParts] = displayName.split(' ');
        return {
          user_id: userCredential.user.uid,
          firstName: firstName || displayName,
          lastName: lastNameParts.join(' ') || '',
          email: data.email,
          message: 'Welcome back!'
        };
      }
    } catch (error: unknown) {
      throw this.handleFirebaseError(error);
    }
  }

  static async signInWithGoogle(): Promise<AuthResponse> {
    try {
      // Clear any existing popup windows and focus
      if (typeof window !== 'undefined') {
        window.focus();
      }

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken(true);

      // Try to send to backend, but don't fail if it's unavailable
      try {
        const response = await this.makeAPIRequest('/google-signup', {
          id_token: idToken,
        });
        return response;
      } catch (apiError: unknown) {
        const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown error';
        console.warn('Backend Google auth unavailable, using Firebase data:', errorMessage);
        
        // Return Firebase-based response
        const displayName = user.displayName || user.email?.split('@')[0] || 'User';
        const [firstName, ...lastNameParts] = displayName.split(' ');
        return {
          user_id: user.uid,
          firstName: firstName || displayName,
          lastName: lastNameParts.join(' ') || '',
          email: user.email || '',
          message: 'Google sign-in successful'
        };
      }
    } catch (error: unknown) {
      throw this.handleFirebaseError(error);
    }
  }

  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      throw this.handleFirebaseError(error);
    }
  }

  static async signOut(): Promise<void> {
    try {
      await auth.signOut();
    } catch (error: unknown) {
      throw this.handleFirebaseError(error);
    }
  }

  private static handleFirebaseError(error: unknown): Error {
    const errorMap: Record<string, string> = {
      'auth/user-not-found': 'No account found with this email address.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters long.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/popup-closed-by-user': 'Authentication cancelled. Please try again.',
      'auth/popup-blocked': 'Popup was blocked. Please allow popups and try again.',
      'auth/cancelled-popup-request': 'Authentication was cancelled. Please try again.',
    };

    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string; message?: string };
      const message = errorMap[firebaseError.code] || firebaseError.message || 'An unexpected error occurred.';
      console.error('Firebase Auth Error:', error);
      return new Error(message);
    }

    if (error instanceof Error) {
      console.error('Firebase Auth Error:', error);
      return error;
    }

    console.error('Firebase Auth Error:', error);
    return new Error('An unexpected error occurred.');
  }
}


// import { 
//   signInWithEmailAndPassword, 
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
//   signInWithPopup,
//   User as FirebaseUser,
//   AuthError as FirebaseAuthError
// } from 'firebase/auth';
// import { auth, googleProvider } from './firebase';
// import { AuthResponse, SignUpData, SignInData } from './types';

// const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// export class AuthService {
//   private static async makeAPIRequest(endpoint: string, data: any): Promise<AuthResponse> {
//     try {
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.detail || 'Authentication failed');
//       }

//       return responseData;
//     } catch (error: any) {
//       console.error('API Request Error:', error);
//       throw new Error(error.message || 'Network error occurred');
//     }
//   }

//   static async signUp(data: SignUpData): Promise<AuthResponse> {
//     try {
//       // Create user with Firebase
//       const userCredential = await createUserWithEmailAndPassword(
//         auth, 
//         data.email, 
//         data.password
//       );

//       // Get Firebase ID token
//       const idToken = await userCredential.user.getIdToken();

//       // Send to your backend
//       const response = await this.makeAPIRequest('/signup', {
//         id_token: idToken,
//         full_name: data.fullName,
//         email: data.email,
//       });

//       return response;
//     } catch (error: any) {
//       throw this.handleFirebaseError(error);
//     }
//   }

//   static async signIn(data: SignInData): Promise<AuthResponse> {
//     try {
//       // Sign in with Firebase
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );

//       // Get Firebase ID token
//       const idToken = await userCredential.user.getIdToken();

//       // Send to your backend
//       const response = await this.makeAPIRequest('/signin', {
//         id_token: idToken,
//         email: data.email,
//       });

//       return response;
//     } catch (error: any) {
//       throw this.handleFirebaseError(error);
//     }
//   }

//   static async signInWithGoogle(): Promise<AuthResponse> {
//     try {
//       // Clear any existing popup windows
//       if (typeof window !== 'undefined') {
//         window.focus();
//       }

//       const result = await signInWithPopup(auth, googleProvider);
//       const idToken = await result.user.getIdToken(true);

//       // Retry mechanism for API call
//       const tryRequest = async (attempt = 1): Promise<Response> => {
//         try {
//           const response = await fetch(`${API_BASE_URL}/google-signup`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ id_token: idToken }),
//           });

//           if (!response.ok && attempt < 3) {
//             await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//             return tryRequest(attempt + 1);
//           }

//           return response;
//         } catch (error) {
//           if (attempt < 3) {
//             await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//             return tryRequest(attempt + 1);
//           }
//           throw error;
//         }
//       };

//       const response = await tryRequest();
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.detail || 'Google authentication failed');
//       }

//       return data;
//     } catch (error: any) {
//       // Handle specific popup errors
//       if (error.code === 'auth/popup-closed-by-user') {
//         throw new Error('Authentication cancelled. Please try again.');
//       } else if (error.code === 'auth/popup-blocked') {
//         throw new Error('Popup was blocked. Please allow popups and try again.');
//       } else if (error.code === 'auth/cancelled-popup-request') {
//         throw new Error('Authentication was cancelled. Please try again.');
//       }
      
//       throw this.handleFirebaseError(error);
//     }
//   }

//   static async resetPassword(email: string): Promise<void> {
//     try {
//       await sendPasswordResetEmail(auth, email);
//     } catch (error: any) {
//       throw this.handleFirebaseError(error);
//     }
//   }

//   static async signOut(): Promise<void> {
//     try {
//       await auth.signOut();
//     } catch (error: any) {
//       throw this.handleFirebaseError(error);
//     }
//   }

//   private static handleFirebaseError(error: any): Error {
//     const errorMap: Record<string, string> = {
//       'auth/user-not-found': 'No account found with this email address.',
//       'auth/wrong-password': 'Incorrect password. Please try again.',
//       'auth/email-already-in-use': 'An account with this email already exists.',
//       'auth/weak-password': 'Password should be at least 6 characters long.',
//       'auth/invalid-email': 'Please enter a valid email address.',
//       'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
//       'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
//       'auth/network-request-failed': 'Network error. Please check your connection.',
//       'auth/popup-closed-by-user': 'Authentication cancelled. Please try again.',
//       'auth/popup-blocked': 'Popup was blocked. Please allow popups and try again.',
//       'auth/cancelled-popup-request': 'Authentication was cancelled. Please try again.',
//     };

//     const message = errorMap[error.code] || error.message || 'An unexpected error occurred.';
//     console.error('Firebase Auth Error:', error);
//     return new Error(message);
//   }
// }