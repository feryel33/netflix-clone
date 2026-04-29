export default [
  {
    ignores: ['frontend/**', 'node_modules/**', '__tests__/**'],
    rules: {
      'no-unused-vars': ['warn', { caughtErrorsIgnorePattern: '^_' }],
      'no-undef': 'warn'
    }
  }
];
