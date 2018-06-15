const path = require('path');
const vueCliConfig = require('@vue/cli-service/webpack.config.js');

module.exports = function() {
  const enabledTs = !!require.resolve('@vue/cli-plugin-typescript');

  if (enabledTs) {
    // Add .ts extension for store, middleware and more
    this.nuxt.options.extensions.push('ts');
  }

  // Extend build
  this.extendBuild(config => {
    // Replace the module by vue-cli
    config.module = vueCliConfig.module;

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
    if (config.name === 'server') {
      const cacheDirectory = path.resolve(
        require.resolve('vue/package.json'),
        '../../.cache/server'
      );
      config.module.rules.forEach(rule => {
        if ('use' in rule && Array.isArray(rule.use)) {
          rule.use.forEach(loader => {
            if ('options' in loader && 'cacheDirectory' in loader.options) {
              loader.options.cacheDirectory = cacheDirectory;
            }
          });
        }
      });
    }
  });
};
