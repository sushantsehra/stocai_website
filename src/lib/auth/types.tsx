export interface User {
  user_id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

export interface AuthResponse {
  user_id: string;
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
  newPassword?: string;
}