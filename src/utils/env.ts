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
    apiUrl: 'http://localhost:8000/api',
    assetsUrl: 'http://localhost:3000',
    isDebugEnabled: true,
    features: {
      newUi: true,
      analytics: false
    }
  },
  staging: {
    apiUrl: 'https://staging-api.stocai.com/api',
    assetsUrl: 'https://staging.stocai.com',
    isDebugEnabled: false,
    features: {
      newUi: true,
      analytics: true
    }
  },
  production: {
    apiUrl: 'https://api.stocai.com/api',
    assetsUrl: 'https://stocai.com',
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

// Export environment utilities
export const env = {
  current: currentEnv,
  isDevelopment: currentEnv === 'development',
  isStaging: currentEnv === 'staging',
  isProduction: currentEnv === 'production',
  apiUrl: config.apiUrl,
  assetsUrl: config.assetsUrl,
  isDebugEnabled: config.isDebugEnabled,
  features: config.features
};

// Export default for easier imports
export default env; 