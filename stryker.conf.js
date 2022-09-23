// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/react.md#react
module.exports = function (config) {
  config.set({
    mutate: ['src/**/*.ts', '!src/**/*@(.test|.spec|Spec).ts', '!src/interfaces/*.ts'],
    mutator: 'typescript',
    testRunner: 'jest',
    reporters: ['progress', 'clear-text', 'html'],
    coverageAnalysis: 'perTest',
    checkers: ['typescript'],
    tsconfigFile: 'tsconfig.json',
    transpilers: [
      'typescript' // Specify that your typescript code needs to be transpiled before tests can be run. Not needed if you're using ts-node Just-in-time compilation.
    ]
  })
}
