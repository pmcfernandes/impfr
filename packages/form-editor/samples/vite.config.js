import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const samplesDir = path.dirname(fileURLToPath(import.meta.url))
const localReact = path.resolve(samplesDir, 'node_modules')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: '.',
  server: { port: 5180 },
  resolve: {
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
    alias: {
      react: path.resolve(localReact, 'react'),
      'react-dom': path.resolve(localReact, 'react-dom'),
      'react/jsx-runtime': path.resolve(localReact, 'react/jsx-runtime'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },
})
