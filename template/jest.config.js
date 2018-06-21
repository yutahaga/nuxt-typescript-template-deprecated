const nuxtConfig = require('./nuxt.config');

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^static/(.*)$': '<rootDir>/src/static/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|<rootDir>/src/**/__tests__/*.(js|jsx|ts|tsx))',
  ],
  globals: {
    'vue-jest': {
      resources: {
        scss: nuxtConfig.sassResources,
      },
    },
  },
};
