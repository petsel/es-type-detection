import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [eslint()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'ESTypeDetection',
      fileName: (format) => `es-type-detection.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      output: {
        exports: 'named'
        //sourcemap: true
      }
    },
    sourcemap: true
  }
});
