import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'XyzElementPlusForm',
      fileName: (format) => format === 'es' ? 'index.js' : 'index.umd.cjs',
      cssFileName: 'style',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        exports: 'named',
        globals: { vue: 'Vue', 'element-plus': 'ElementPlus' },
      },
    },
  },
})
