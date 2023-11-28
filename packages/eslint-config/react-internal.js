const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['eslint-config-turbo'],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'separate-type-imports' }],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level']
  },
  globals: {
    React: true,
    JSX: true
  },
  env: {
    browser: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/'
  ],
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ['*.js?(x)', '*.ts?(x)'] }
  ]
};
