import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

export default defineConfig({
  server: {
    host: true, // Exposes server for Railway
    port: 5173,
    strictPort: true,
  },
