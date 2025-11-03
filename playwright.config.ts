import { defineConfig, devices } from '@playwright/test';

/**
 * Konfigurasi Playwright (TypeScript)
 * Docs: https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  testDir: './tests',

  /* Menjalankan test satu per satu (lebih stabil untuk login setup) */
  fullyParallel: false,

  /* Cegah test.only agar tidak lolos di CI */
  forbidOnly: !!process.env.CI,

  /* Ulangi test jika gagal di CI */
  retries: process.env.CI ? 2 : 0,

  /* Batasi jumlah worker di CI */
  workers: process.env.CI ? 1 : undefined,

  /* Tambahkan file global setup (error logging global, dsb) */
  globalSetup: './tests/global.setup.ts',

  /* Reporter hasil test */
  reporter: [['html', { outputFolder: 'report' }]],

  /* Pengaturan default untuk semua project */
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry', // menyimpan trace ketika gagal
  },

  /* Konfigurasi browser */
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: false, // true = tidak tampil browser, false = tampil Chrome
      },
    },
    // Kalau mau tambah browser lain, tinggal aktifkan di bawah ini:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Jika kamu perlu server lokal sebelum test dijalankan */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
