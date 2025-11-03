import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import credentials from '../data/credentials.json';

const errorLogPath = path.join(__dirname, '../data/errorLog.json');

setup('Login ke SauceDemo dan simpan state', async ({ page }) => {
  try {
    await page.goto('https://www.saucedemo.com/');

    // Isi form login pakai data dari JSON
    await page.fill('[data-test="username"]', credentials.username);
    await page.fill('[data-test="password"]', credentials.password);
    await page.click('[data-test="login-button"]');

    // Tunggu halaman produk
    await page.waitForURL('**/inventory.html');

    // Simpan session login ke JSON
    const storageState = await page.context().storageState();
    fs.mkdirSync('storage', { recursive: true });
    fs.writeFileSync('storage/auth.json', JSON.stringify(storageState, null, 2));

    console.log('✅ Login berhasil! State tersimpan di storage/auth.json');
  } catch (err: any) {
    // Jika error, tulis ke errorLog.json
    const logEntry = {
      test: 'Login ke SauceDemo',
      status: 'failed',
      error: err.message,
      time: new Date().toISOString(),
    };

    let logs: any[] = [];
    if (fs.existsSync(errorLogPath)) {
      logs = JSON.parse(fs.readFileSync(errorLogPath, 'utf-8') || '[]');
    }
    logs.push(logEntry);
    fs.writeFileSync(errorLogPath, JSON.stringify(logs, null, 2));

    console.error(`❌ Error saat login: ${err.message}`);
  }
});
