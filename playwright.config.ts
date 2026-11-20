import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.TEST_ENV ?? 'qa'}`), quiet: true });

delete process.env.GIO_MODULE_DIR;

export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup.ts',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['html'],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    headless: !!process.env.CI,
    trace: 'on',
    screenshot: 'on',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 10_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chrome' }, testIgnore: /api\// },
    ...(process.env.ALL_BROWSERS
      ? [
          { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testIgnore: /api\// },
          { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: /api\// },
        ]
      : []),
    { name: 'api', testMatch: /api\/.*\.spec\.ts/, use: { baseURL: process.env.API_URL } },
  ],
});
