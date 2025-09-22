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
      className="flex items-center justify-center w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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