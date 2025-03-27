module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 'latest',

    // This line is crucial for import/export support.
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',

    // // for future use
    // 'plugin:@typescript-eslint/recommended',

    // integrates Prettier into ESLint
    'plugin:prettier/recommended',

    'plugin:yml/standard'
  ],
  plugins: ['prettier', 'yml'],
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      parser: 'yaml-eslint-parser'
    }
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  }
};
