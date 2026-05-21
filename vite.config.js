import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/GautamAutomobile/', // Match your repo name exactly
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})