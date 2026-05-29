import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'analyze' &&
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap',
      }),
  ].filter(Boolean),
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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@supabase/')) {
            return 'supabase';
          }
          if (id.includes('node_modules/@codemirror/')) {
            return 'codemirror';
          }
          if (id.includes('node_modules/mermaid')) {
            return 'mermaid';
          }
        },
      },
    },
  },
  define:{
    'process.env': {},
  },
  server :{
    open : true,
    port : 5173,
    allowedHosts: true
  },
}))
