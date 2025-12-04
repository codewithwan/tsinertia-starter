import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { defineConfig } from 'vite';

// Try to resolve ziggy from vendor, fallback to node_modules if not available
const ziggyPath = existsSync(resolve(__dirname, 'vendor/tightenco/ziggy/dist/index.js'))
    ? resolve(__dirname, 'vendor/tightenco/ziggy/dist/index.js')
    : 'ziggy-js';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': ziggyPath,
        },
        dedupe: ['react', 'react-dom'],
    },
});
