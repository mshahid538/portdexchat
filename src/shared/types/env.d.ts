/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_AI_MODEL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_LOGGING: string;
  readonly VITE_ENCRYPTION_KEY: string;
  readonly VITE_JWT_SECRET: string;
  readonly VITE_CHAT_MAX_TOKENS: string;
  readonly VITE_CHAT_TEMPERATURE: string;
  readonly VITE_CHAT_MAX_CONTEXT_MESSAGES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 