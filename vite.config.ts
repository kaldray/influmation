import inertia from '@adonisjs/inertia/client'
import adonisjs from '@adonisjs/vite/client'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { getDirname } from '@adonisjs/core/helpers'

const ReactCompilerConfig = {
  target: '19',
}

export default defineConfig({
  server: {
    host: true,
    strictPort: true,
    hmr: {
      port: 81,
      clientPort: 443,
      path: '/hmr',
      timeout: 1000,
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  resolve: {
    alias: {
      '#style': `${getDirname(import.meta.url)}/styled-system`,
      '#ui': `${getDirname(import.meta.url)}/inertia/src`,
    },
  },
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.tsx' } }),
    react({ babel: { plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]] } }),
    adonisjs({
      entrypoints: ['inertia/app/app.tsx'],
      reload: ['resources/views/**/*.edge', './inertia/src/components/**/*.{ts,tsx}'],
    }),
    tsconfigPaths({ root: './inertia' }),
  ],
})
