export default {
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov', 'json'],
      include: ['src/**/*.js'], // Only instrument files under src/
      exclude: [
        'src/**/typedef.js', // Don’t cover type definition files.
        'src/**/*.test.js', // Don’t cover test files (if placed in src)
        'test/', // Don’t cover anything in your test folder
        'dist/', // Build output
        'coverage/', // Prevent self-inclusion
        '**/*.config.*' // any config
        //'**/vite.config.*',     // Vite config
        //'**/vitest.config.*'    // Vitest config
      ]
    }
  }
};
