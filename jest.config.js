module.exports = {
    preset: 'ts-jest',           // Use ts-jest preset for TypeScript
    testEnvironment: 'node',     // Set test environment to Node.js
    transform: {
        '^.+\\.ts?$': 'ts-jest',   // Use ts-jest to transform TypeScript files
    },
    moduleFileExtensions: ['ts', 'js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: ['**/?(*.)+(spec|test).ts'], // Match test files
    setupFilesAfterEnv: ['./jest.setup.ts'],
};