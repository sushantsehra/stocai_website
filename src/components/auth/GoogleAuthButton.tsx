'use client';

import React from 'react';
import Image from 'next/image';
import google from '@/assets/google.jpeg';

interface GoogleAuthButtonProps {
  onGoogleAuth: () => Promise<void>;
  loading: boolean;
  disabled?: boolean;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onGoogleAuth,
  loading,
  disabled = false,
}) => {
  return (
    <button
      onClick={onGoogleAuth}
      disabled={loading || disabled}
      className="flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-[#D8E1F0] bg-white px-6 py-3 transition-colors hover:border-[#0B64F4] hover:bg-[#F4F8FF] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <span className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <>
           <Image
            src={google}
            alt="Google logo"
            width={25}
            height={25}
            className="object-cover mr-3"
          />
          <span className="font-medium font-gotham text-[#323232]">
            Continue with Google
          </span>
        </>
      )}
    </button>
  );
};

export default GoogleAuthButton;
