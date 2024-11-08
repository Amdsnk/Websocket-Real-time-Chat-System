import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // Expose the server to external connections
    port: 5173, // Default port for local development
    strictPort: true,
  },
  build: {
    outDir: 'dist', // Directory for built files
  },
  preview: {
    port: 4173, // Port for previewing built files (important for Railway)
    host: '0.0.0.0', // Expose the preview server
  },
});
