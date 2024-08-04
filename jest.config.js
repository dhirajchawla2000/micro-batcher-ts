module.exports = {
    rootDir: './',
    collectCoverage: false,
    testPathIgnorePatterns: ['<rootDir>/node_modules'],
    projects: [
        {
            displayName: 'micro-batcher',
            transform: {
                '^.+\\.ts?$': [
                    'ts-jest',
                    {
                        tsconfig: '<rootDir>/micro-batcher/tsconfig.json'
                    }
                ]
            },
            testEnvironment: 'node',
            testMatch: ['<rootDir>/micro-batcher/**/*.test.ts']
        }
    ],
    prettierPath: null
}
