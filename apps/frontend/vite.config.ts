import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'apps/frontend',        // tells Vite where index.html is
  plugins: [react()],           // no extra babel plugins
  build: {
    outDir: 'dist',             // output folder relative to root
  },
});