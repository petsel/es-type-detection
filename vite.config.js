import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [eslint()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'es_td',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `es-type-detection.${format}.js`
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
