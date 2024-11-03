import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import inertia from '@adonisjs/inertia/client'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: true,
    strictPort: true,
    hmr: {
      port: 81,
      clientPort: 443,
      path: '/hmr',
      timeout: 10000,
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },

  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.tsx' } }),
    adonisjs({ entrypoints: ['inertia/app/app.tsx'], reload: ['resources/views/**/*.edge'] }),
    react(),
  ],
})
