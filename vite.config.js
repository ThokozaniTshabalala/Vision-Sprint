import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
})