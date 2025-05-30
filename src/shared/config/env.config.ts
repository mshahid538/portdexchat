interface EnvConfig {
  apiUrl: string;
  apiKey: string;
  enableAnalytics: boolean;
  enableLogging: boolean;
  appName: string;
  appVersion: string;
  appEnv: string;
  encryptionKey: string;
  jwtSecret: string;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value || defaultValue || '';
};

export const envConfig: EnvConfig = {
  apiUrl: getEnvVar('VITE_API_URL'),
  apiKey: getEnvVar('VITE_API_KEY'),
  enableAnalytics: getEnvVar('VITE_ENABLE_ANALYTICS') === 'true',
  enableLogging: getEnvVar('VITE_ENABLE_LOGGING') === 'true',
  appName: getEnvVar('VITE_APP_NAME', 'PortdexChat'),
  appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  appEnv: getEnvVar('VITE_APP_ENV', 'development'),
  encryptionKey: getEnvVar('VITE_ENCRYPTION_KEY'),
  jwtSecret: getEnvVar('VITE_JWT_SECRET'),
};

// Validate required environment variables
const requiredEnvVars = ['VITE_API_URL', 'VITE_API_KEY', 'VITE_ENCRYPTION_KEY', 'VITE_JWT_SECRET'];
requiredEnvVars.forEach(key => {
  if (!import.meta.env[key]) {
    console.warn(`Warning: Required environment variable ${key} is not set`);
  }
});

export default envConfig; 