const iosEnvironmentOptions = {
  port: 4723,
  capabilities: {
    platformName: "iOS",
    platformVersion: "11.3",
    deviceName: "iPhone X",
    automationName: "XCUITest",
    wdaLocalPort: 8100,
    app: "./app/AppiumJestSample.app"
  }
};

const androidEnvironmentOptions = {
  port: 4723,
  capabilities: {
    platformName: "Android",
    deviceName: "Android Emulator",
    automationName: "Appium",
    avd: "Pixel_3_API_29",
    systemPort: 8200,
    app: "./app/AppiumJestSample.apk"
  }
};

module.exports = {
  testEnvironment: "jest-environment-webdriverio",
  testEnvironmentOptions: iosEnvironmentOptions,
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
