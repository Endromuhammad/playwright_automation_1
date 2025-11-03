import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Form Testing', () => {

  test('Isi form dan trigger error', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');

    
    await expect(page).toHaveTitle(/Practice/);
  });

  test.afterEach(async ({}, testInfo) => {
    const logPath = path.join(__dirname, '../data/errorLog.json');

    if (testInfo.status !== 'passed') {
      const logEntry = {
        test: testInfo.title,
        file: testInfo.file,
        status: testInfo.status,
        error: testInfo.error?.message,
        time: new Date().toISOString(),
      };

      let logs: any[] = [];
      if (fs.existsSync(logPath)) {
        logs = JSON.parse(fs.readFileSync(logPath, 'utf-8') || '[]');
      }

      logs.push(logEntry);
      fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
      console.log(`❌ Error ditulis ke errorLog.json: ${testInfo.title}`);
    }
  });
});
