module.exports = {
  presets: ['@vue/app'],
  plugins: [
    '@babel/plugin-syntax-logical-assignment-operators',
    '@babel/plugin-syntax-nullish-coalescing-operator',
    '@babel/plugin-syntax-optional-chaining',
    ['@babel/plugin-syntax-pipeline-operator', { proposal: 'minimal' }],
  ],
};
