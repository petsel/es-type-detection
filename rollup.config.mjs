import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

// const formats = [
//   { format: 'cjs', file: 'dist/es-type-detection.cjs.js' },
//   { format: 'es', file: 'dist/es-type-detection.es.js' },
//   { format: 'umd', file: 'dist/es-type-detection.umd.js', name: 'ESTypeDetection' },
//   { format: 'umd', file: 'dist/es-type-detection.umd.min.js', name: 'ESTypeDetection', plugins: [terser()] }
// ];
// export default formats.map(({ format, file, name, plugins = [] }) => ({
//   input: 'src/index.js',
//   output: { format, file, name, sourcemap: true },
//   plugins: [nodeResolve(), commonjs(), ...plugins]
// }));

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/es-type-detection.cjs.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/es-type-detection.esm.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/es-type-detection.umd.js',
        name: 'MethodModifier',
        format: 'umd',
        sourcemap: true
      },
      {
        file: 'dist/es-type-detection.umd.min.js',
        name: 'MethodModifier',
        format: 'umd',
        plugins: [terser()],
        sourcemap: true
      }
    ],
    plugins: [nodeResolve(), commonjs()]
  }
];
