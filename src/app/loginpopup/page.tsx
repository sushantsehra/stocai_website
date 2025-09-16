"use client";
import LoginPopup from '@/components/LoginPopup';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const isOpen = true;
  
  const handleClose = () => {
    if (isMounted) {
      router.push('/');
    }
  };

  // Don't render until component is mounted
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <LoginPopup isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default LoginPage;