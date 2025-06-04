import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/__tests__/setup.ts', '/__tests__/mocks/'],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    'src/app.ts',
    'src/config/',
    'src/adapters/api/routes',
    'src/adapters/db'       
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;