import { test, expect } from '@playwright/test';

test.describe('all case', { tag: '@all' }, () => {
    test.describe('positif case', { tag: '@valid' }, () => {
  test('test case 1', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await page.locator('#header_container div').nth(1).click();
  });

  test('test case 2', async ({ page }) => {
    await page.goto('https://blazedemo.com/');
    await page.locator('select[name="fromPort"]').selectOption('Boston');
    await page.locator('select[name="toPort"]').selectOption('Rome');
    await page.getByRole('button', { name: 'Find Flights' }).click();
    await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();
    await page.getByRole('textbox', { name: 'Name', exact: true }).fill('halo');
    await page.getByRole('textbox', { name: 'Address' }).fill('pingn');
    await page.getByRole('textbox', { name: 'City' }).fill('tanger');
    await page.getByRole('textbox', { name: 'State' }).fill('dajkaw123');
    await page.getByRole('textbox', { name: 'Zip Code' }).fill('12312');
    await page.locator('#cardType').selectOption('amex');
    await page.getByRole('textbox', { name: 'Credit Card Number' }).fill('183497183749');
    await page.getByRole('textbox', { name: 'Month' }).fill('12');
    await page.getByRole('textbox', { name: 'Year' }).fill('2022');
    await page.locator('form div').filter({ hasText: 'Name on Card' }).click();
    await page.getByRole('textbox', { name: 'Name on Card' }).click();
    await page.getByRole('textbox', { name: 'Name on Card' }).fill('jon');
  });

  test('test case 3', async ({ page }) => {
    await page.goto('https://formy-project.herokuapp.com/');

     await page.getByRole('link',{name:'Drag and Drop'}).click()
  
     await expect(page).toHaveURL('https://formy-project.herokuapp.com/dragdrop');
  });

  test('test case 4', async ({ page }) => {
    await page.goto('https://formy-project.herokuapp.com/');

     await page.getByRole('link',{name:'Checkbox'}).click()
  
     await expect(page).toHaveURL('https://formy-project.herokuapp.com/checkbox');
  });

  test('test case 5', async ({ page }) => {
    await page.goto('https://formy-project.herokuapp.com/');

     await page.getByRole('link',{name:'Datepicker'}).click()
  
     await expect(page).toHaveURL('https://formy-project.herokuapp.com/datepicker');
  });
});

test.describe('negatif case', { tag: '@invalid' }, () => {
  test('test case 1', async ({ page }) => {
    console.log('hello');
  });

  test('test case 2', async ({ page }) => {
    console.log('world');
  });

  test('test case 3', async ({ page }) => {
    console.log('test case 3');
  });

  test('test case 4', async ({ page }) => {
    console.log('test case 4');
  });

  test('test case 5', async ({ page }) => {
    console.log('test case 5');
  });
});
});

