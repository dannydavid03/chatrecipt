import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',  // Make sure root points to the correct directory
  build: {
    outDir: 'dist',  // Ensure Vercel knows where to find the build output
  },
  base: '/'
});
