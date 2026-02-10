import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // process.cwd() is a Node.js API, so we ensure it's called in a way that TS accepts.
  // The 'process' global is available in the Vite config file execution context.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Injects the API key. We do not polyfill the entire process.env object here 
      // to avoid breaking internal Vite/React logic.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});