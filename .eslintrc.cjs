/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    semi: ['error', 'never'],
    'vue/match-component-file-name': ['error', {
      extensions: ['vue'],
      shouldMatchCase: false,
    }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'import/prefer-default-export': 'off',
  },
}
