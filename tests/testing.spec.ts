import { test, expect } from '@playwright/test';

test('saucedemo testing', async ({ page }) => {
  await page.goto('https://formy-project.herokuapp.com/');

  await page.getByRole('link',{name:'Autocomplete'}).click()
  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL('https://formy-project.herokuapp.com/autocomplete');
});
