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
  access_token?: string;
  token_type?: string;
  preview_status?: string;
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

export interface AuthRequestContext {
  access_tier?: string;
  source?: string;
  waitlist_reference_id?: string;
  auth_flow?: string;
}
