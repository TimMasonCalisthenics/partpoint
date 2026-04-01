// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/stats': { target: 'http://localhost:8080', changeOrigin: true },
      '/login': { target: 'http://localhost:8080', changeOrigin: true },
      '/logout': { target: 'http://localhost:8080', changeOrigin: true },
      '/register': { target: 'http://localhost:8080', changeOrigin: true },
      '/verify-otp': { target: 'http://localhost:8080', changeOrigin: true },
      '/products': { target: 'http://localhost:8080', changeOrigin: true },
      '/categories': { target: 'http://localhost:8080', changeOrigin: true },
      '/vehicles': { target: 'http://localhost:8080', changeOrigin: true },
      '/stores': { target: 'http://localhost:8080', changeOrigin: true },
      '/users': { target: 'http://localhost:8080', changeOrigin: true },
      '/favourites': { target: 'http://localhost:8080', changeOrigin: true },
      '/upload': { target: 'http://localhost:8080', changeOrigin: true },
      '/uploads': { target: 'http://localhost:8080', changeOrigin: true },
      '/prices': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
});
