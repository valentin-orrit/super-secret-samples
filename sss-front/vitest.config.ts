import { defineConfig } from 'vitest/config'

export default defineConfig({
    cacheDir: '/tmp/vitest',
    test: {
        environment: 'jsdom',
    },
})
