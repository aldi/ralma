import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['bin/**', 'docs/**', 'node_modules/**', 'output/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      // Mirrors the standards documented in AGENTS.md.
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': 'error',
    },
  },
  {
    // Build and formatting scripts report to the terminal by design.
    files: ['tools/**/*.mjs'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    // registerRalma's `warnOnCollision` option is documented behaviour, not stray debugging.
    files: ['src/**/*.js'],
    rules: {
      'no-console': ['error', { allow: ['warn'] }],
    },
  },
  {
    // Tests stub console to assert on warnings.
    files: ['test/**/*.js'],
    rules: {
      'no-console': 'off',
    },
  },
];
