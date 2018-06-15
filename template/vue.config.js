const path = require('path');

module.exports = {
  chainWebpack: config => {
    // Remove unnecessary plugins
    config.plugins
      .delete('vue-loader')
      .delete('define')
      .delete('case-sensitive-paths')
      .delete('friendly-errors')
      .delete('hmr')
      .delete('no-emit-on-errors')
      .delete('progress')
      .delete('html')
      .delete('preload')
      .delete('prefetch')
      .delete('copy');

    // Change resolve config for eslint-import-resolver
    config.resolve.alias
      .set('~~', path.join(__dirname))
      .set('~', path.join(__dirname, 'src'))
      .set('assets', path.join(__dirname, 'assets'))
      .set('static', path.join(__dirname, 'static'));
  },
};
