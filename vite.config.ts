import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/cfg/setupTests.ts',
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/components/**/*.tsx', 'src/pages/**/*.tsx'],
    },
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@context': '/src/context',
      '@type': '/src/types',
      '@store': '/src/store',
      '@assets': '/src/assets',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [`@import "./src/assets/styles/main.scss";`],
      },
    },
  },
});
