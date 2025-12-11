import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import {resolve} from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            packages: resolve(__dirname, 'packages'),
            "@": resolve(__dirname, "src")
        },
    },
    build: {
        outDir: resolve(__dirname, 'dist/app'),
        sourcemap: true,
        emptyOutDir: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vue: ['vue'],
                    router: ['vue-router'],
                    iconify: ['@iconify/vue'],
                },
            },
        },
    },
})
