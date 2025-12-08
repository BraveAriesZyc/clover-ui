import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
      entryRoot: resolve(__dirname, 'packages'),
      outDir: resolve(__dirname, 'dist/types'),
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: resolve(__dirname, 'dist'),
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'CloverUI',
      fileName: (format) => `clover-ui.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: 'assets/[name].[ext]',
        exports: "named",
      },
    },
  },
});

