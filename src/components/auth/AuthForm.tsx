'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { AuthService } from '@/lib/auth/authService';
import { SignUpData, SignInData } from '@/lib/auth/types';
import { useUser } from '@/contexts/UserContext';
import { setCookie } from '@/utils/cookies';
import GoogleAuthButton from './GoogleAuthButton';
import AuthError from './AuthError';

interface AuthFormProps {
  onSuccess?: () => void;
}

interface AuthResponseData {
  user_id: string;
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
}

const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  const dataLayerWindow = window as unknown as Window & { dataLayer?: unknown[] };
  if (!dataLayerWindow.dataLayer) {
    dataLayerWindow.dataLayer = [];
  }
  dataLayerWindow.dataLayer.push(payload);
};

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  const { setUser } = useUser();

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Form data states
  const [signupData, setSignupData] = useState<SignUpData>({
    fullName: '',
    email: '',
    password: ''
  });

  const [signinData, setSigninData] = useState<SignInData>({
    email: '',
    password: ''
  });

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: ''
  });

  const clearMessages = useCallback(() => {
    setErrorMessage('');
    setSuccessMessage('');
  }, []);

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    clearMessages();
  };

  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
    clearMessages();
  };

  const handleForgotPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
    clearMessages();
  };

  const handleAuthSuccess = useCallback((userData: AuthResponseData) => {
    if (!mounted) return;
    
    // Update user context
    const user = {
      user_id: userData.user_id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };

    setUser(user);
    
    // Set user cookie
    setCookie('user', JSON.stringify(user), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    // PostHog tracking with better error handling
    if (typeof window !== 'undefined') {
      try {
        // Dynamic import to avoid SSR issues
        import('posthog-js').then((posthog) => {
          if (posthog.default) {
            const emailDomain = userData.email?.split("@")[1] || "unknown";
            posthog.default.identify(userData.user_id, {
              email: userData.email,
              first_name: userData.firstName,
              last_name: userData.lastName,
            });
            posthog.default.capture('Authentication Success', {
              method: isLogin ? 'signin' : 'signup',
              user_id: userData.user_id,
              email_domain: emailDomain,
            });
            pushToDataLayer({
              event: "auth_success",
              method: isLogin ? "signin" : "signup",
              user_id: userData.user_id,
              email_domain: emailDomain,
            });
          }
        }).catch(console.warn);
      } catch (error) {
        console.warn('PostHog tracking error:', error);
      }
    }

    const message = userData.message || `${isLogin ? 'Welcome back!' : 'Account created successfully!'}`;
    setSuccessMessage(message);
    
    // Call onSuccess callback after a short delay
    setTimeout(() => {
      onSuccess?.();
    }, 500);
  }, [mounted, setUser, isLogin, onSuccess]);

  const handleError = useCallback((error: string) => {
    if (!mounted) return;
    
    setErrorMessage(error);
    
    // PostHog error tracking with better error handling
    if (typeof window !== 'undefined') {
      try {
        import('posthog-js').then((posthog) => {
          if (posthog.default) {
            posthog.default.capture('Authentication Error', {
              method: isLogin ? 'signin' : 'signup',
              error: error,
            });
            pushToDataLayer({
              event: "auth_error",
              method: isLogin ? "signin" : "signup",
              error,
            });
          }
        }).catch(console.warn);
      } catch (error) {
        console.warn('PostHog tracking error:', error);
      }
    }
  }, [mounted, isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mounted) return;
    
    setLoading(true);
    clearMessages();

    try {
      if (forgotPassword) {
        await AuthService.resetPassword(forgotPasswordData.email);
        setSuccessMessage('Password reset email sent! Check your inbox.');
      } else if (isLogin) {
        const response = await AuthService.signIn(signinData);
        handleAuthSuccess(response);
      } else {
        const response = await AuthService.signUp(signupData);
        handleAuthSuccess(response);
      }
    } catch (error: unknown) {
      console.error('Auth error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      handleError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!mounted) return;
    
    setLoading(true);
    clearMessages();

    try {
      const response = await AuthService.signInWithGoogle();
      handleAuthSuccess(response);
    } catch (error: unknown) {
      console.error('Google auth error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Google authentication failed';
      handleError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSignupData({ fullName: '', email: '', password: '' });
    setSigninData({ email: '', password: '' });
    setForgotPasswordData({ email: '' });
    clearMessages();
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return <div className="w-full h-64 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="font-sans flex items-center justify-center w-full text-gray-900">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="items-center w-full h-full flex flex-col justify-center flex-1">
          <div className="relative w-full text-center font-medium text-2xl tracking-[0] leading-[normal]">
            
            {/* Dynamic Headers */}
            {isLogin ? (
              forgotPassword ? (
                <>
                  <h3 className="font-medium text-xl font-gotham text-center">
                    Don&apos;t Worry we will handle it
                  </h3>
                  <h2 className="font-bold text-[#323232] text-4xl text-center mb-4">
                    Reset your password
                  </h2>
                </>
              ) : (
                <>
                  <h3 className="font-medium font-gotham text-xl text-center">
                    Welcome Back
                  </h3>
                  <h2 className="font-bold font-gotham text-[#323232] text-3xl text-center mb-2">
                    Get back to it
                  </h2>
                </>
              )
            ) : (
              <>
                <h3 className="font-medium font-gotham text-xl text-center">
                  Let&apos;s get started
                </h3>
                <h2 className="font-bold font-gotham text-[#323232] text-4xl text-center mb-4">
                  Create new account
                </h2>
              </>
            )}

            {/* Success/Error Messages */}
            <AuthError error={errorMessage} success={successMessage} />

            {/* Google Login Button */}
            {!forgotPassword && (
              <div className="flex justify-center space-x-4 mt-6">
                <GoogleAuthButton 
                  onGoogleAuth={handleGoogleAuth}
                  loading={loading}
                  disabled={loading}
                />
              </div>
            )}

            {/* OR Divider */}
            {!forgotPassword && (
              <div className="relative text-center text-[#323232] my-6">
                <span className="font-medium text-[#323232] font-gotham text-[20px] bg-white px-4">
                  OR
                </span>
              </div>
            )}

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              {!isLogin ? (
                /* Signup Form */
                <>
                  <div className="flex items-center pt-3 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af] transition-colors">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name *"
                      value={signupData.fullName}
                      onChange={handleSignupChange}
                      required
                      disabled={loading}
                      className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50 bg-transparent"
                    />
                  </div>

                  <div className="flex items-center pt-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af] transition-colors">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                      disabled={loading}
                      className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50 bg-transparent"
                    />
                  </div>

                  <div className="flex items-center pt-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af] transition-colors">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password *"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                      disabled={loading}
                      minLength={6}
                      className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50 bg-transparent"
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center w-full px-6 py-5 bg-[#54b0af] rounded-2xl overflow-hidden hover:bg-[#4a9998] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#54b0af] focus:ring-opacity-50"
                    >
                      {loading ? (
                        <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <span className="font-medium font-gotham text-white text-xl">
                          Create Account
                        </span>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                /* Login/Forgot Password Forms */
                <>
                  {forgotPassword ? (
                    /* Forgot Password Form */
                    <>
                      <div className="flex items-center pt-3 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af] transition-colors">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email *"
                          value={forgotPasswordData.email}
                          onChange={handleForgotPasswordChange}
                          required
                          disabled={loading}
                          className="relative w-full p-4 font-medium text-lg tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50 bg-transparent"
                        />
                      </div>

                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex items-center justify-center w-full px-6 py-5 bg-[#54b0af] rounded-2xl overflow-hidden hover:bg-[#4a9998] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#54b0af] focus:ring-opacity-50"
                        >
                          {loading ? (
                            <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          ) : (
                            <span className="font-medium font-gotham text-white text-xl">
                              Send Reset Email
                            </span>
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Login Form */
                    <>
                      <div className="flex items-center pt-3 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af] transition-colors">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email *"
                          value={signinData.email}
                          onChange={handleSigninChange}
                          required
                          disabled={loading}
                          className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50 bg-transparent"
                        />
                      </div>

                      <div className="flex items-center pt-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af] transition-colors">
                        <input
                          type="password"
                          name="password"
                          placeholder="Password *"
                          value={signinData.password}
                          onChange={handleSigninChange}
                          required
                          disabled={loading}
                          className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50 bg-transparent"
                        />
                      </div>

                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex items-center justify-center w-full px-6 py-4 bg-[#54b0af] rounded-2xl overflow-hidden hover:bg-[#4a9998] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#54b0af] focus:ring-opacity-50"
                        >
                          {loading ? (
                            <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          ) : (
                            <span className="font-medium text-white text-xl">
                              Login
                            </span>
                          )}
                        </button>
                      </div>
                    </>
                  )}

                  {/* Forgot Password Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      setForgotPassword(!forgotPassword);
                      clearMessages();
                    }}
                    disabled={loading}
                    className="text-[#54b0af] hover:text-[#4a9998] text-sm font-medium w-full text-center mt-2 transition-colors disabled:opacity-50 focus:outline-none"
                  >
                    {forgotPassword ? (
                      <span className="flex items-center font-gotham justify-center">
                        <FiArrowLeft className="mr-2" /> Back to Login
                      </span>
                    ) : (
                      "Forgot Password?"
                    )}
                  </button>
                </>
              )}
            </form>

            {/* Toggle Login/Signup */}
            {!forgotPassword && (
              <div className="mt-6">
                <p className="w-full text-center font-medium text-lg tracking-[0] leading-[30px]">
                  <span className="text-gray-500">
                    {isLogin ? "Don't have an account?" : "Already a member?"}
                  </span>{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setForgotPassword(false);
                      resetForm();
                    }}
                    disabled={loading}
                    className="text-[#54b0af] hover:text-[#4a9998] font-semibold transition-colors disabled:opacity-50 focus:outline-none"
                  >
                    {isLogin ? "Sign Up" : "Login"}
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

// 'use client';

// import React, { useState } from 'react';
// import { FiArrowLeft } from 'react-icons/fi';
// import { AuthService } from '@/lib/auth/authService';
// import { SignUpData, SignInData } from '@/lib/auth/types';
// import { useUser } from '@/contexts/UserContext';
// import { setCookie } from '@/utils/cookies';
// import GoogleAuthButton from './GoogleAuthButton';
// import AuthError from './AuthError';
// import posthog from 'posthog-js';

// interface AuthFormProps {
//   onSuccess?: () => void;
// }

// const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [forgotPassword, setForgotPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const { setUser } = useUser();

//   // Form data states
//   const [signupData, setSignupData] = useState<SignUpData>({
//     fullName: '',
//     email: '',
//     password: ''
//   });

//   const [signinData, setSigninData] = useState<SignInData>({
//     email: '',
//     password: ''
//   });

//   const [forgotPasswordData, setForgotPasswordData] = useState({
//     email: ''
//   });

//   const clearMessages = () => {
//     setErrorMessage('');
//     setSuccessMessage('');
//   };

//   const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSignupData({ ...signupData, [e.target.name]: e.target.value });
//     clearMessages();
//   };

//   const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSigninData({ ...signinData, [e.target.name]: e.target.value });
//     clearMessages();
//   };

//   const handleForgotPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
//     clearMessages();
//   };

//   const handleAuthSuccess = (userData: any) => {
//     // Update user context
//     const user = {
//       user_id: userData.user_id,
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email,
//     };

//     setUser(user);
    
//     // Set user cookie
//     setCookie('user', JSON.stringify(user), {
//       path: '/',
//       maxAge: 30 * 24 * 60 * 60, // 30 days
//     });

//     // PostHog tracking
//     if (typeof window !== 'undefined' && posthog) {
//       posthog.capture('Authentication Success', {
//         method: isLogin ? 'signin' : 'signup',
//         email: userData.email,
//         user_id: userData.user_id,
//       });
//     }

//     setSuccessMessage(`${isLogin ? 'Welcome back!' : 'Account created successfully!'}`);
    
//     // Call onSuccess callback after a short delay
//     setTimeout(() => {
//       onSuccess?.();
//     }, 1500);
//   };

//   const handleError = (error: string) => {
//     setErrorMessage(error);
    
//     // PostHog tracking
//     if (typeof window !== 'undefined' && posthog) {
//       posthog.capture('Authentication Error', {
//         method: isLogin ? 'signin' : 'signup',
//         error: error,
//       });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     clearMessages();

//     try {
//       if (forgotPassword) {
//         await AuthService.resetPassword(forgotPasswordData.email);
//         setSuccessMessage('Password reset email sent! Check your inbox.');
//       } else if (isLogin) {
//         const response = await AuthService.signIn(signinData);
//         handleAuthSuccess(response);
//       } else {
//         const response = await AuthService.signUp(signupData);
//         handleAuthSuccess(response);
//       }
//     } catch (error: any) {
//       handleError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleAuth = async () => {
//     setLoading(true);
//     clearMessages();

//     try {
//       const response = await AuthService.signInWithGoogle();
//       handleAuthSuccess(response);
//     } catch (error: any) {
//       handleError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="font-sans flex items-center justify-center w-full text-gray-900">
//       <div className="flex flex-col w-full items-center justify-center">
//         <div className="items-center w-full h-full flex flex-col justify-center flex-1">
//           <div className="relative w-full text-center font-medium text-2xl tracking-[0] leading-[normal]">
            
//             {/* Dynamic Headers */}
//             {isLogin ? (
//               forgotPassword ? (
//                 <>
//                   <h3 className="font-medium text-xl font-gotham text-center">
//                     Don&apos;t Worry we will handle it
//                   </h3>
//                   <h2 className="font-bold text-[#323232] text-4xl text-center mb-4">
//                     Reset your password
//                   </h2>
//                 </>
//               ) : (
//                 <>
//                   <h3 className="font-medium font-gotham text-xl text-center">
//                     Welcome Back
//                   </h3>
//                   <h2 className="font-bold font-gotham text-[#323232] text-3xl text-center mb-2">
//                     Get back to it
//                   </h2>
//                 </>
//               )
//             ) : (
//               <>
//                 <h3 className="font-medium font-gotham text-xl text-center">
//                   Let&apos;s get started
//                 </h3>
//                 <h2 className="font-bold font-gotham text-[#323232] text-4xl text-center mb-4">
//                   Create new account
//                 </h2>
//               </>
//             )}

//             {/* Success/Error Messages */}
//             <AuthError error={errorMessage} success={successMessage} />

//             {/* Google Login Button */}
//             {!forgotPassword && (
//               <div className="flex justify-center space-x-4 mt-6">
//                 <GoogleAuthButton 
//                   onGoogleAuth={handleGoogleAuth}
//                   loading={loading}
//                   disabled={loading}
//                 />
//               </div>
//             )}

//             {/* OR Divider */}
//             {!forgotPassword && (
//               <div className="relative text-center text-[#323232] my-6">
//                 <span className="font-medium text-[#323232] font-gotham text-[20px] bg-white px-4">
//                   OR
//                 </span>
//               </div>
//             )}

//             {/* Form Section */}
//             <form onSubmit={handleSubmit} className="space-y-4 w-full">
//               {!isLogin ? (
//                 /* Signup Form */
//                 <>
//                   <div className="flex items-center pt-3 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
//                     <input
//                       type="text"
//                       name="fullName"
//                       placeholder="Full Name *"
//                       value={signupData.fullName}
//                       onChange={handleSignupChange}
//                       required
//                       disabled={loading}
//                       className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50"
//                     />
//                   </div>

//                   <div className="flex items-center pt-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Email *"
//                       value={signupData.email}
//                       onChange={handleSignupChange}
//                       required
//                       disabled={loading}
//                       className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50"
//                     />
//                   </div>

//                   <div className="flex items-center pt-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
//                     <input
//                       type="password"
//                       name="password"
//                       placeholder="Password *"
//                       value={signupData.password}
//                       onChange={handleSignupChange}
//                       required
//                       disabled={loading}
//                       minLength={6}
//                       className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50"
//                     />
//                   </div>

//                   <div className="pt-6">
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="flex items-center justify-center w-full px-6 py-5 bg-[#54b0af] rounded-2xl overflow-hidden hover:bg-[#4a9998] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {loading ? (
//                         <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                       ) : (
//                         <span className="font-medium font-gotham text-white text-xl">
//                           Create Account
//                         </span>
//                       )}
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 /* Login/Forgot Password Forms */
//                 <>
//                   {forgotPassword ? (
//                     /* Forgot Password Form */
//                     <>
//                       <div className="flex items-center pt-3 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
//                         <input
//                           type="email"
//                           name="email"
//                           placeholder="Email *"
//                           value={forgotPasswordData.email}
//                           onChange={handleForgotPasswordChange}
//                           required
//                           disabled={loading}
//                           className="relative w-full p-4 font-medium text-lg tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50"
//                         />
//                       </div>

//                       <div className="pt-6">
//                         <button
//                           type="submit"
//                           disabled={loading}
//                           className="flex items-center justify-center w-full px-6 py-5 bg-[#54b0af] rounded-2xl overflow-hidden hover:bg-[#4a9998] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           {loading ? (
//                             <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                           ) : (
//                             <span className="font-medium font-gotham text-white text-xl">
//                               Send Reset Email
//                             </span>
//                           )}
//                         </button>
//                       </div>
//                     </>
//                   ) : (
//                     /* Login Form */
//                     <>
//                       <div className="flex items-center pt-3 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
//                         <input
//                           type="email"
//                           name="email"
//                           placeholder="Email *"
//                           value={signinData.email}
//                           onChange={handleSigninChange}
//                           required
//                           disabled={loading}
//                           className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50"
//                         />
//                       </div>

//                       <div className="flex items-center pt-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-b-2 border-gray-200 hover:border-gray-300 focus-within:border-[#54b0af]">
//                         <input
//                           type="password"
//                           name="password"
//                           placeholder="Password *"
//                           value={signinData.password}
//                           onChange={handleSigninChange}
//                           required
//                           disabled={loading}
//                           className="relative w-full p-4 font-medium text-xl tracking-[0] leading-[normal] focus:outline-none text-gray-700 placeholder-gray-500 disabled:opacity-50"
//                         />
//                       </div>

//                       <div className="pt-6">
//                         <button
//                           type="submit"
//                           disabled={loading}
//                           className="flex items-center justify-center w-full px-6 py-4 bg-[#54b0af] rounded-2xl overflow-hidden hover:bg-[#4a9998] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           {loading ? (
//                             <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                           ) : (
//                             <span className="font-medium text-white text-xl">
//                               Login
//                             </span>
//                           )}
//                         </button>
//                       </div>
//                     </>
//                   )}

//                   {/* Forgot Password Toggle */}
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setForgotPassword(!forgotPassword);
//                       clearMessages();
//                     }}
//                     disabled={loading}
//                     className="text-[#54b0af] hover:text-[#4a9998] text-sm font-medium w-full text-center mt-2 transition-colors disabled:opacity-50"
//                   >
//                     {forgotPassword ? (
//                       <span className="flex items-center font-gotham justify-center">
//                         <FiArrowLeft className="mr-2" /> Back to Login
//                       </span>
//                     ) : (
//                       "Forgot Password?"
//                     )}
//                   </button>
//                 </>
//               )}
//             </form>

//             {/* Toggle Login/Signup */}
//             {!forgotPassword && (
//               <div className="mt-6">
//                 <p className="w-full text-center font-medium text-lg tracking-[0] leading-[30px]">
//                   <span className="text-gray-500">
//                     {isLogin ? "Don't have an account?" : "Already a member?"}
//                   </span>{' '}
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsLogin(!isLogin);
//                       clearMessages();
//                       setForgotPassword(false);
//                       // Reset forms
//                       setSignupData({ fullName: '', email: '', password: '' });
//                       setSigninData({ email: '', password: '' });
//                     }}
//                     disabled={loading}
//                     className="text-[#54b0af] hover:text-[#4a9998] font-semibold transition-colors disabled:opacity-50"
//                   >
//                     {isLogin ? "Sign Up" : "Login"}
//                   </button>
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
