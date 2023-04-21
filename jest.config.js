export default {
  roots: ['<rootDir>/test'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/main/**',
    '!**/test/**',
    '!**/config/**',
    '!**/**/index.js'
  ]
}
