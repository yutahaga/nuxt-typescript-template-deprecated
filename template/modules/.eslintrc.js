module.exports = {
  env: {
    node: true
  },
  extends: [
    '@vue/airbnb',
    '@vue/prettier'
  ],
  rules: {
    'strict': 'off',
    'import/no-extraneous-dependencies': 'off'
  }
};
