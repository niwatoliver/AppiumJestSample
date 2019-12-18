module.exports = {
  testEnvironment: "jest-environment-webdriverio",
  testEnvironmentOptions: {
    port: 4723,
    capabilities: {
      platformName: "iOS",
      platformVersion: "11.3",
      deviceName: "iPhone X",
      automationName: "XCUITest",
      wdaLocalPort: 8100,
      app: "./app/AppiumJestSample.app"
    }
  },
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  testMatch: [
    "**/tests/**/*.test.ts"
  ]
};
