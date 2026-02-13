import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Replace 'tokyo-trip' with your actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/tokyo-trip/',
})
