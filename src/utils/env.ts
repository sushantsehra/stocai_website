/**
 * Environment configuration utility
 * 
 * This file provides environment-specific configuration values based on NODE_ENV.
 */

type Environment = 'development' | 'staging' | 'production';

// Get the current environment
const getEnvironment = (): Environment => {
  return (process.env.NODE_ENV as Environment) || 'development';
};

// Environment-specific configuration
interface EnvConfig {
  apiUrl: string;
  assetsUrl: string;
  isDebugEnabled: boolean;
  features: {
    newUi: boolean;
    analytics: boolean;
  };
}

// Configuration values for each environment
const envConfigs: Record<Environment, EnvConfig> = {
  development: {
    apiUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://127.0.0.1:8000',
    assetsUrl: process.env.NEXT_PUBLIC_APP_PUBLIC_URL || 'http://localhost:3000',
    isDebugEnabled: true,
    features: {
      newUi: true,
      analytics: false
    }
  },
  staging: {
    apiUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://backend.mystocai.com',
    assetsUrl: process.env.NEXT_PUBLIC_APP_PUBLIC_URL || 'https://mystocai.com',
    isDebugEnabled: false,
    features: {
      newUi: true,
      analytics: true
    }
  },
  production: {
    apiUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://backend.mystocai.com',
    assetsUrl: process.env.NEXT_PUBLIC_APP_PUBLIC_URL || 'https://mystocai.com',
    isDebugEnabled: false,
    features: {
      newUi: true,
      analytics: true
    }
  }
};

// Get the configuration for the current environment
const currentEnv = getEnvironment();
const config = envConfigs[currentEnv];

// Get APP_PUBLIC_URL from environment variables or fallback to default
const getPublicUrl = (): string => {
  if (typeof window !== 'undefined') {
    // Client-side: use the environment variable passed from Next.js
    return process.env.NEXT_PUBLIC_APP_PUBLIC_URL || window.location.origin;
  }
  // Server-side: use the environment variable or fallback
  return process.env.NEXT_PUBLIC_APP_PUBLIC_URL || config.assetsUrl;
};

// Export environment utilities
export const env = {
  current: currentEnv,
  isDevelopment: currentEnv === 'development',
  isStaging: currentEnv === 'staging',
  isProduction: currentEnv === 'production',
  apiUrl: config.apiUrl,
  assetsUrl: config.assetsUrl,
  publicUrl: getPublicUrl(),
  isDebugEnabled: config.isDebugEnabled,
  features: config.features
};

// Utility function to generate signup redirect URLs
export const getAppUrl = (): string => {
  return env.publicUrl;
}
export const getSignupUrl = (redirectPath?: string): string => {
  const baseUrl = env.publicUrl;
  const signupPath = '/signUp'; // Note: using /signUp to match the existing external URLs
  
  if (!redirectPath) {
    return `${baseUrl}${signupPath}`;
  }
  
  return `${baseUrl}${signupPath}?redirect=${encodeURIComponent(redirectPath)}`;
};

// Export default for easier imports
export default env; 