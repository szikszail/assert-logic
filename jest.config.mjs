import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const config = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
    "^.+\\.js$": ["ts-jest", { useESM: false }], // Force CJS transpile for JS deps like chai
  },
  reporters: ["default", "jest-junit"],
  transformIgnorePatterns: ["node_modules/(?!chai)/"],
  testMatch: ["**/tests/**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/", "dist"],
  setupFilesAfterEnv: ["./tests/setup/areStringsMatch.ts"],
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["./src/**/*.ts"],
  moduleFileExtensions: ["ts", "js"],
  extensionsToTreatAsEsm: [],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
export default config;
