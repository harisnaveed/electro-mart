import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Helps avoid browser CORS issues in dev:
      // Frontend calls /api/... and Vite forwards to https://www.myrepairapp.com/...
      '/api': {
        target: 'https://www.myrepairapp.com',
        changeOrigin: true,
        secure: true,
        // If someone accidentally sets VITE_PRODUCTS_API_URL to "/api/api/...",
        // this rewrite will still forward correctly.
        rewrite: (path) => path.replace(/^\/api\/api\//, '/api/'),
      },
    },
  },
})
