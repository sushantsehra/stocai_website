"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";
import { CommunityAuthService } from "@/lib/auth/communityAuthService";
import { AuthRequestContext, SignInData, SignUpData, AuthResponse } from "@/lib/auth/types";
import { setAuthCookie } from "@/utils/cookies";

interface BlogAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogAuthModal({ isOpen, onClose }: BlogAuthModalProps) {
  const communityAuthContext: AuthRequestContext = {
    access_tier: "community",
    source: "blog_auth_modal",
    auth_flow: "community",
  };

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const persistCommunityAuth = (response: AuthResponse) => {
    if (response.access_token) {
      setAuthCookie("community_access_token", response.access_token);
    }
  };

  const handleCommunitySignUp = async (data: SignUpData): Promise<AuthResponse> => {
    try {
      const response = await CommunityAuthService.signUp(data);
      persistCommunityAuth(response);
      return response;
    } catch (error) {
      if (error instanceof Error && /user already exists/i.test(error.message)) {
        const response = await CommunityAuthService.signIn({
          email: data.email,
          password: data.password,
        });
        persistCommunityAuth(response);
        return {
          ...response,
          message: "Account already exists. Logged you in so you can continue to comment.",
        };
      }

      throw error;
    }
  };

  const handleCommunityLogin = async (data: SignInData): Promise<AuthResponse> => {
    const response = await CommunityAuthService.signIn(data);
    persistCommunityAuth(response);
    return response;
  };

  const handleCommunityGoogleAuth = async (): Promise<AuthResponse> => {
    const response = await CommunityAuthService.signInWithGoogle();
    persistCommunityAuth(response);
    return response;
  };

  const handleAuthSuccess = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={handleBackdropClick}>
      <div className="absolute inset-0 bg-[#0F172A]/45 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-[#EEF4FF] p-2 text-[#0B64F4] transition hover:bg-[#DCE9FF]"
          aria-label="Close blog auth modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 md:p-8">
          <AuthForm
            onSuccess={handleAuthSuccess}
            initialMode="login"
            variant="community"
            showGoogleAuth
            authContext={communityAuthContext}
            onEmailSignUp={handleCommunitySignUp}
            onEmailLogin={handleCommunityLogin}
            onGoogleLogin={handleCommunityGoogleAuth}
          />
        </div>
      </div>
    </div>
  );
}
