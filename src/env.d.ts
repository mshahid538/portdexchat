/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORTDEX_API_URL: string
  readonly VITE_PORTDEX_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 