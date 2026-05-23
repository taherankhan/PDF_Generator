import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ["node_modules"],
      },
    },
  },
  base: "/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
  define:{
    'process.env': {},
  },
  server :{
    open : true,
    port : 5173
  }

})
