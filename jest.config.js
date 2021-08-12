// jest.config.js
module.exports = {
    preset: 'ts-jest/presets/js-with-babel',
    testEnvironment: 'node',
    // transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es|other-es-lib))"],
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: false,
    globals: {
      'ts-jest': {
        diagnostics: false,
        tsconfig: "tsconfig.test.json"
      }
    }
  };
