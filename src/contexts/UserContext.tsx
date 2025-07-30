"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserCookie } from '@/utils/cookies';

interface User {
  user_id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const getUserFromCookies = () => {
  return getUserCookie();
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = getUserFromCookies();
    if (storedUser) {
      try {
        setUser(storedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { user, setUser } = context;

  // Only update user from cookies on first load
  useEffect(() => {
    if (user === null) {
      const storedUser = getUserFromCookies();
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, [user, setUser]);

  return context;
}


export { UserContext }; 