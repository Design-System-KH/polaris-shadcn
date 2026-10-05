import next from '@repo/eslint-config/next';

export default [
  ...next,
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: { console: 'readonly' } },
  },
];
