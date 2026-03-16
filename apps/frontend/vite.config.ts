import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'apps/frontend'), // points to index.html
  plugins: [react()],                             // no babel plugins needed
  build: {
    outDir: path.resolve(__dirname, 'dist/frontend'), // optional output folder
  },
});