import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://staging-ws.di.no/ws/json/addressHelper/v-2/NO/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res, options) => {
            proxyReq.setHeader("referer", "http://localhost:3000");
          });
        },
      },
    },
  },
})
