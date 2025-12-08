import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: resolve(__dirname, 'dist/library'),
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', '@iconify/vue'],
      output: {
        preserveModules: true,
        preserveModulesRoot: resolve(__dirname, 'packages'),
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})
