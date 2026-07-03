import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Google Chrome',
      use: { 
        channel: 'chrome' // Uses the stable Google Chrome already on your PC
      },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox' // Uses Playwright's clean Firefox engine safely
      },
    },
  ],
});
