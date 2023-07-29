// https://www.npmjs.com/package/@vue/eslint-config-airbnb
// eslint-disable-next-line import/no-extraneous-dependencies
require('@rushstack/eslint-patch/modern-module-resolution');
const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting');
const path = require('node:path');

module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: ['airbnb-base', 'plugin:vue/vue3-essential', './.eslintrc-auto-import.json'],
  globals: {
    $push: true,
  },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['vue'],
  settings: {
    ...createAliasSetting({
      '@': `${path.resolve(__dirname, './src')}`,
    }),
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
  rules: {
    'linebreak-style': 'off',
    'no-unused-vars': 'error',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'consistent-return': 'off',
    'no-console': 0,
    'max-len': 0,
    'no-shadow': 0,
    'no-unused-expressions': 0,
    'arrow-body-style': 0,
    'max-classes-per-file': 0,
    'no-restricted-syntax': 0,
    'import/no-unresolved': 0,
    'import/no-cycle': 0,
    // vue
    'vue/multi-word-component-names': 0,
  },
};
