module.exports = function() {
  const enabledTs = !!require.resolve('@vue/cli-plugin-typescript');
  const enabledExtractCSS =
    this.nuxt.options.build && this.nuxt.options.build.extractCSS;

  if (enabledTs) {
    // Add .ts extension for store, middleware and more
    this.nuxt.options.extensions.push('ts');
  }

  // Extend build
  this.extendBuild(config => {
    // Set NUXT_ENV to server or client
    process.env.NUXT_ENV = config.name;

    const vueCliConfig = require('@vue/cli-service/webpack.config.js');

    // Replace the module by vue-cli
    config.module = vueCliConfig.module;

    // Remove CSS Extract Plugin from nuxt.js side
    if (enabledExtractCSS) {
      const CSSExtractPlugin = require('mini-css-extract-plugin');
      const CSSExtractPluginIndex = config.plugins.findIndex(
        plugin => plugin instanceof CSSExtractPlugin
      );

      if (CSSExtractPluginIndex !== -1) {
        config.plugins.splice(CSSExtractPluginIndex, 1);
      }
    }

    // Add plugins from vue-cli
    config.plugins.push.apply(config.plugins, vueCliConfig.plugins);

    // Add .ts extension in webpack resolve
    if (enabledTs && config.resolve.extensions.indexOf('.ts') === -1) {
      config.resolve.extensions.push('.ts');
    }

    // Resolve modules
    ['resolve', 'resolveLoader'].forEach(propName => {
      config[propName].modules.push.apply(
        config[propName].modules,
        vueCliConfig[propName].modules.filter(
          m => config[propName].modules.indexOf(m) === -1
        )
      );
    });

    // Change the cache directory on server entry
    config.module.rules.forEach(rule => {
      if ('use' in rule && Array.isArray(rule.use)) {
        rule.use.forEach(loader => {
          if ('options' in loader && 'cacheIdentifier' in loader.options) {
            delete loader.options.cacheIdentifier;
          }
        });
      }
    });
  });
};
