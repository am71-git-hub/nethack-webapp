import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Multi-entry: main app (index.html) + sandbox workbench (sandbox.html).
// Sandbox is a dev/debug surface. It ships in the prod build for now; we can
// gate it later if needed.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sandbox: resolve(__dirname, 'sandbox.html'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
