import inertia from '@adonisjs/inertia/client'
import adonisjs from '@adonisjs/vite/client'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

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
  resolve: {
    alias: {
      '#style': resolve(import.meta.dirname, './styled-system'),
      '#ui': resolve(import.meta.dirname, './inertia/src'),
    },
  },
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.tsx' } }),
    adonisjs({ entrypoints: ['inertia/app/app.tsx'], reload: ['resources/views/**/*.edge'] }),
    react(),
    tsconfigPaths({ root: './inertia' }),
  ],
})
