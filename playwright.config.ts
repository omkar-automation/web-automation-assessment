const { defineConfig, devices } = require('@playwright/test');
const { environments } = require('./config/environments');

const environment = process.env.TEST_ENV || 'qa';
const baseURL = environments[environment];
if (!baseURL) {
  throw new Error(`Unknown/unconfigured TEST_ENV '${environment}'. For staging, set STAGING_BASE_URL.`);
}

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  workers: 2,
  retries: process.env.CI ? 2 : 0,
  forbidOnly: !!process.env.CI,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    serviceWorkers: 'block', // Allow page.route() to observe API calls.
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
