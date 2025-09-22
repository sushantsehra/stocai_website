'use client';

import React from 'react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

interface AuthErrorProps {
  error?: string;
  success?: string;
}

const AuthError: React.FC<AuthErrorProps> = ({ error, success }) => {
  if (!error && !success) return null;

  return (
    <>
      {success && (
        <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-4">
          <FaCheckCircle className="mr-2" />
          {success}
        </div>
      )}
      {error && (
        <div className="flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4">
          <FaExclamationCircle className="mr-2" />
          {error}
        </div>
      )}
    </>
  );
};

export default AuthError;