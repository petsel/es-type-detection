module.exports = {
  root: true,
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
    'plugin:jsdoc/recommended',

    // // for future use
    // 'plugin:@typescript-eslint/recommended',

    // integrates Prettier into ESLint
    'plugin:prettier/recommended',

    'plugin:yml/standard'
  ],
  plugins: ['jsdoc', 'prettier', 'yml'],
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      parser: 'yaml-eslint-parser'
    }
  ],
  rules: {
    'prettier/prettier': 'error',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/check-tag-names': 'off',
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/newline-after-description': 'off',
    'jsdoc/check-types': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  }
};
