module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.jest.json" }], // 🔥 Usa el nuevo tsconfig
    "^.+\\.(js|jsx)$": "babel-jest", // 👈 Asegura que Jest pueda procesar JS y JSX
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@mui|@babel|@emotion|react-dom|next).+\\.js$", // No ignorar estas dependencias ESM
  ],
  moduleNameMapper: {
    "^@mui/material/(.*)$": "<rootDir>/node_modules/@mui/material/$1",
    "^@mui/icons-material/(.*)$": "<rootDir>/node_modules/@mui/icons-material/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/app/layout.tsx",
    "!src/app/services/weatherService.ts",
    "!src/**/*.styles.ts",
    "src/app/providers.tsx"
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
