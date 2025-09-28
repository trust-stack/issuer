import {configDefaults, defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.e2e.test.ts'],
    exclude: configDefaults.exclude,
  },
});
