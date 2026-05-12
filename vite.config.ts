import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      vue(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'nginx/ssl/key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'nginx/ssl/cert.pem')),
      },
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'https://localhost:8443',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
