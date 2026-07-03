import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Changed to true so your multi-browser tests run at the same time
  retries: 0,
  workers: undefined,  // Removed the '1' limit so Playwright can use your full system speed
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
        channel: 'chrome' 
      },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox' 
      },
    },
    {
      name: 'webkit', // Added Safari/WebKit testing safely
      use: { 
        ...devices['Desktop Safari'] 
      },
    },
  ],
});
