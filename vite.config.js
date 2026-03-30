import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/BendNaturalist/', // 👈 This tells Vite to add the folder name to all paths
})