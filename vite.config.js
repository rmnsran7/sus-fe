import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert' // 1. Import the correct plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert() // 2. Add the plugin here
  ]
  // 3. You can remove the server: { https: true } block
})