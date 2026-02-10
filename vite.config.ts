import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env to prevent "process is not defined" error
      'process.env': {},
      // Injects the API key specifically
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});