const getJestMappersFromTSConfig = require('tsconfig-paths-jest-mapper');

const moduleNameMapper = getJestMappersFromTSConfig();

module.exports = {
  rootDir: 'app',
  moduleNameMapper,
  setupFilesAfterEnv: ['../jest.setup.js'],
  testEnvironment: 'jsdom',
  testRunner: 'jest-circus/runner',
  resetMocks: true,
  transform: {
    '\\.(ts|js)x?$': 'babel-jest',
  },
};
