import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
      babelConfig: true,
    },
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "src/index.ts?(x)",
    "index.ts",
    "bootstrap.tsx",
    "svgrMock.ts",
  ],
  coverageDirectory: "testCoverage",
  testMatch: ["**/spec/**/?(*.)+(spec).ts?(x)"],
  moduleNameMapper: {
    "\\.(jpg|png|ttf|woff|woff2|less|css)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/jest-mock/svgr-mock.ts",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(spec).ts?(x)$": "ts-jest",
  },
};

export default config;
