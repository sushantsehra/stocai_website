'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/auth/firebase';
import { useUser } from '@/contexts/UserContext';
import { AuthService } from '@/lib/auth/authService';
import { setLogoutSignal, deleteUserCookie } from '@/utils/cookies';

export const useAuth = () => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      setLoading(false);
      
      if (!firebaseUser && user?.user_id) {
        setUser(null);
        deleteUserCookie();
      }
    });

    return () => unsubscribe();
  }, [user, setUser]);

  const signOut = async () => {
    try {
      setLogoutSignal();
      await AuthService.signOut();
      setUser(null);
      deleteUserCookie();
      
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return {
    user,
    firebaseUser,
    loading,
    signOut,
    isAuthenticated: !!user?.user_id && !!firebaseUser,
  };
};
