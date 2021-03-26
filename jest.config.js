const getJestMappersFromTSConfig = require('tsconfig-paths-jest-mapper');

const moduleNameMapper = getJestMappersFromTSConfig();

module.exports = {
  rootDir: 'app',
  // testPathIgnorePatterns: ['/node_modules/', '/native-addons/'],
  moduleNameMapper,
  setupFilesAfterEnv: ['../jest.setup.js'],
  transform: {
    '\\.(ts|js)x?$': 'babel-jest',
  },
};
