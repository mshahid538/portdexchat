export const AppConfig = {
  api: {
    url: import.meta.env.VITE_API_URL,
    key: import.meta.env.VITE_API_KEY,
    model: import.meta.env.VITE_AI_MODEL || 'thinker',
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Portdex AI Chat',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    env: import.meta.env.VITE_APP_ENV || 'development',
  },
  chat: {
    maxTokens: parseInt(import.meta.env.VITE_CHAT_MAX_TOKENS || '500'),
    temperature: parseFloat(import.meta.env.VITE_CHAT_TEMPERATURE || '0.7'),
    maxContextMessages: parseInt(import.meta.env.VITE_CHAT_MAX_CONTEXT_MESSAGES || '10'),
  },
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    logging: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  },
  security: {
    encryptionKey: import.meta.env.VITE_ENCRYPTION_KEY,
    jwtSecret: import.meta.env.VITE_JWT_SECRET,
  },
} as const; 