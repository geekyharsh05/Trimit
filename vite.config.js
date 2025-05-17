import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 4173,
    // Enables HMR in Docker development environments
    watch: {
      usePolling: true,
    }
  },
  build: {
    // Output directory that will be copied to Nginx in the Dockerfile
    outDir: 'dist',
    // Optimize chunks for production
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  }
});