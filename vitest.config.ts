import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()] as any,
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: [],
        coverage: {
            provider: 'v8',
        },
    },
})
