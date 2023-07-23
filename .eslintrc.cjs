// https://www.npmjs.com/package/@vue/eslint-config-airbnb
// eslint-disable-next-line import/no-extraneous-dependencies
require('@rushstack/eslint-patch/modern-module-resolution');
const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting');
const path = require('node:path');

module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: ['airbnb-base', 'plugin:vue/vue3-essential'],
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
  },
};
