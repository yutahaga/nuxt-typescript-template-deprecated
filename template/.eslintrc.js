const path = require('path');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/prettier',
    '@vue/typescript',
  ],
  settings: {
    'import/core-modules': ['vue'],
  },
  rules: {
    // no use strict
    strict: 'off',
    // debug
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
