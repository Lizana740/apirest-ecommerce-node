module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    setupFiles: ['<rootDir>/jest.setup.js'],
    coveragePathIgnorePatterns: [
      '/src/domain/',
    ],
  };