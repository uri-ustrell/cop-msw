module.exports = {
  setupFiles: [require.resolve('whatwg-fetch')],
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
  unmockedModulePathPatterns: ['react'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^services(.*)$': '<rootDir>/src/services$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^@mng/dataManager/esm$': '@mng/dataManager/index.js',
  },
};
