import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@configs': path.resolve(__dirname, './src/configs'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@common': path.resolve(__dirname, './src/common'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@api': path.resolve(__dirname, './src/api'),
            '@apps': path.resolve(__dirname, './src/apps'),
        },
    },
});
