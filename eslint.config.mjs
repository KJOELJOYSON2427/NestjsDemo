// @ts-check
import tseslint from 'typescript-eslint';
export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  {
    rules: {}, // no rules at all
  }
);