import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['e2e/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: 'coverage',
    },
    env: {
      WEB_DID_DOMAIN: 'test.truststack.dev',
    },
  },
});
