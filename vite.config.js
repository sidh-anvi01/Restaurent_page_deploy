import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base:"/Restaurent_page_deploy/",
  plugins: [react()],
})
