const getJestMappersFromTSConfig = require('tsconfig-paths-jest-mapper');

const moduleNameMapper = getJestMappersFromTSConfig();

module.exports = {
  rootDir: 'app',
  moduleNameMapper,
  setupFilesAfterEnv: ['../jest.setup.js'],
  transform: {
    '\\.(ts|js)x?$': 'babel-jest',
  },
};
