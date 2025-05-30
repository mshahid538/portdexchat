import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: 'dist',
      // Ensure environment variables are properly handled during build
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    css: {
      postcss: './postcss.config.js',
    },
    // Expose environment variables to the client
    define: {
      'import.meta.env.VITE_PORTDEX_API_URL': JSON.stringify(env.VITE_PORTDEX_API_URL),
      'import.meta.env.VITE_PORTDEX_API_KEY': JSON.stringify(env.VITE_PORTDEX_API_KEY),
    },
  };
});