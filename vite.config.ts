import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ous',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@utils': path.resolve(__dirname, './src/utils/index.ts'),
      '@schemas': path.resolve(__dirname, './src/schemas/index.ts'),
      '@hooks': path.resolve(__dirname, './src/hooks/index.ts'),
    },
  },
});
