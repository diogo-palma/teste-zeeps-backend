const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      'max-classes-per-file': ['error', 1],
      'no-unused-vars': 'warn',
      'complexity': ['warn', { 'max': 10 }],
      'max-lines-per-function': ['warn', { max: 50 }],
      'prefer-const': 'warn',
      'no-duplicate-imports': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
