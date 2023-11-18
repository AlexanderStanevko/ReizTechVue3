import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      public: fileURLToPath(new URL('./public', import.meta.url)),
      assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      types: fileURLToPath(new URL('./src/types', import.meta.url)),
      pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
      layouts: fileURLToPath(new URL('./src/layouts', import.meta.url)),
      router: fileURLToPath(new URL('./src/router', import.meta.url)),
      stores: fileURLToPath(new URL('./src/stores', import.meta.url)),
      utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
      hooks: fileURLToPath(new URL('./src/hooks', import.meta.url)),
    },
  },
})
