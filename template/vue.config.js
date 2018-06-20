/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const nuxtConfig = require('./nuxt.config');

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

    // Add Stylelint plugin
    config.plugin('stylelint').use(StylelintPlugin, [
      {
        files: ['**/*.css', '**/*.scss', '**/*.vue'],
      },
    ]);

    // Add style resouces to all SFCs.
    if ('sassResources' in nuxtConfig && nuxtConfig.sassResources) {
      const resources = (typeof nuxtConfig.sassResources === 'string'
        ? [nuxtConfig.sassResources]
        : nuxtConfig.sassResources
      ).map(resource =>
        resource
          .replace(/^~~\//, `./`)
          .replace(/^~\//, `./src/`)
          .replace(/^@\//, `./src/`)
          .replace(/^assets\//, `./src/assets/`)
          .replace(/^static\//, `./src/static/`)
      );

      ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(ruleName => {
        config.module
          .rule('scss')
          .oneOf(ruleName)
          .use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            resources,
          });
      });
    }
  },
};
