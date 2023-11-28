const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['next/core-web-vitals', 'eslint-config-turbo'],
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
    node: true
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
    'node_modules/'
  ],
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }]
};
