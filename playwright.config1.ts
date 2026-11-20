import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.TEST_ENV ?? 'qa'}`), quiet: true });

// VS Code installed as a snap sets GIO_MODULE_DIR to its own network modules; WebKit (Safari)
// loads them, crashes, and every page.goto fails with "WebKit encountered an internal error"
delete process.env.GIO_MODULE_DIR;

export default defineConfig({
  testDir: './tests',
  // Clears old allure-results before every run so the Allure report shows only the latest run
  globalSetup: './global-setup.ts',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
 
  workers: 3,
  // HTML report in playwright-report/, Allure results in allure-results/ (npm run allure:report)
  reporter: [
    ['html'],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  retries: 1,
  // use: {
    // baseURL: process.env.BASE_URL,
    // headless: true,
    // trace: 'retain-on-failure',
    // screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
    // actionTimeout: 10_000,
    // navigationTimeout: 10_000,
  // },
  projects: [
    // Headed Chromium; trace and screenshot saved for every test, video only when a test fails
    {
      name: 'chrome',
      testIgnore: /api\//,
      use: {
        browserName: 'chromium',
        headless: false,
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'on',
        //viewport: {width:720,height:720}
      }
    },
    // Runs in the installed Google Chrome rather than Playwright's bundled Chromium
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chrome', trace: 'on', screenshot: 'on' }, testIgnore: /api\// },
    // Firefox/WebKit only run when ALL_BROWSERS is set (npm run test:all-browsers, CI)
    ...(process.env.ALL_BROWSERS
      ? [
          { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testIgnore: /api\// },
          { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: /api\// },
        ]
      : []),
    { name: 'api', testMatch: /api\/.*\.spec\.ts/, use: { baseURL: process.env.API_URL } },
  ],
});
