import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    https: {
      key: path.resolve(__dirname, 'localhost+3-key.pem'),
      cert: path.resolve(__dirname, 'localhost+3.pem')
    },
    cors: {
      origin: "https://localhost:3000"
    }
  }
})
