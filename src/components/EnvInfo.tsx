import React from 'react';
import { env } from '../utils/env';

/**
 * EnvInfo component displays current environment information
 * This is useful for debugging and verifying environment configuration
 */
export const EnvInfo: React.FC = () => {
  // Only show in development or when debug is enabled
  if (!env.isDevelopment && !env.isDebugEnabled) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 bg-gray-800 text-white p-2 text-xs rounded-tl-md opacity-75 hover:opacity-100 transition-opacity">
      <h4 className="font-bold">Environment: {env.current}</h4>
      <ul className="mt-1">
        <li>API URL: {env.apiUrl}</li>
        <li>Assets URL: {env.assetsUrl}</li>
        <li>Debug: {env.isDebugEnabled ? 'Enabled' : 'Disabled'}</li>
        <li>New UI: {env.features.newUi ? 'Enabled' : 'Disabled'}</li>
        <li>Analytics: {env.features.analytics ? 'Enabled' : 'Disabled'}</li>
      </ul>
    </div>
  );
};

export default EnvInfo; 