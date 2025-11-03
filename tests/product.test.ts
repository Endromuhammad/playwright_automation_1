import { test, expect } from '@playwright/test';

// Gunakan hasil login dari auth.json
test.use({ storageState: 'storage/auth.json' });

test('Lihat produk setelah login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  const title = await page.textContent('.title');
  expect(title).toBe('Products');

  const productCount = await page.locator('.inventory_item').count();
  console.log(`🛒 Jumlah produk: ${productCount}`);
  expect(productCount).toBeGreaterThan(0);
});
