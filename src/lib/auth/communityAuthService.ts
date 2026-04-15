"use client";

import { AuthResponse, SignInData, SignUpData } from "./types";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000";

interface CommunityAuthResponse {
  user_id: string;
  access_token: string;
  token_type: string;
  preview_status: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  full_name?: string;
  name?: string;
  message?: string;
}

interface CommunityAuthError {
  detail?: string | { message?: string; error?: string; detail?: string };
  message?: string;
  error?: string | { message?: string; error?: string; detail?: string };
}

function getErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object") {
    const errorRecord = error as Record<string, unknown>;

    if (typeof errorRecord.message === "string") {
      return errorRecord.message;
    }

    if (typeof errorRecord.detail === "string") {
      return errorRecord.detail;
    }

    if (typeof errorRecord.error === "string") {
      return errorRecord.error;
    }
  }

  return "Community authentication failed.";
}

function normalizeResponse(
  response: CommunityAuthResponse,
  fallback: { email?: string; fullName?: string }
): AuthResponse {
  const resolvedName =
    response.full_name ||
    response.name ||
    fallback.fullName ||
    fallback.email?.split("@")[0] ||
    "Community User";
  const [firstName, ...lastNameParts] = resolvedName.trim().split(" ");

  return {
    user_id: response.user_id,
    email: response.email || fallback.email || "",
    firstName: response.firstName || firstName || "Community",
    lastName: response.lastName || lastNameParts.join(" "),
    access_token: response.access_token,
    token_type: response.token_type,
    preview_status: response.preview_status,
    message: response.message,
  };
}

async function postCommunityAuth<TBody extends Record<string, unknown>>(
  endpoint: string,
  body: TBody,
  fallback: { email?: string; fullName?: string }
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseData = (await response.json().catch(() => ({}))) as CommunityAuthResponse & CommunityAuthError;

  if (!response.ok) {
    throw new Error(
      getErrorMessage(responseData.detail) ||
        getErrorMessage(responseData.message) ||
        getErrorMessage(responseData.error) ||
        "Community authentication failed."
    );
  }

  return normalizeResponse(responseData, fallback);
}

export class CommunityAuthService {
  static async signUp(data: SignUpData): Promise<AuthResponse> {
    return postCommunityAuth(
      "/community/signUp",
      {
        full_name: data.fullName,
        email: data.email,
        password: data.password,
        access_tier: "community",
        source: "blog_auth_modal",
      },
      { email: data.email, fullName: data.fullName }
    );
  }

  static async signIn(data: SignInData): Promise<AuthResponse> {
    return postCommunityAuth(
      "/community/logIn",
      {
        email: data.email,
        password: data.password,
        source: "blog_auth_modal",
      },
      { email: data.email }
    );
  }

  static async signInWithGoogle(): Promise<AuthResponse> {
    const googleResult = await signInWithPopup(auth, googleProvider);
    const idToken = await googleResult.user.getIdToken(true);

    return postCommunityAuth(
      "/community/google-auth",
      {
        id_token: idToken,
        source: "blog_auth_modal",
        access_tier: "community",
      },
      {
        email: googleResult.user.email || undefined,
        fullName: googleResult.user.displayName || undefined,
      }
    );
  }
}
