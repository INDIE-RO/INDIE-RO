module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // 또는 'jsdom' - React 컴포넌트 테스트 시 사용
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // tsconfig.json의 paths 설정에 맞춤
  },
  testMatch: ['<rootDir>/__tests__/unit/*.test.(js|jsx|ts|tsx)'],
};
