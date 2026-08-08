const { test, expect } = require('playwright/test');

const baseURL = 'http://127.0.0.1:3000/';

async function clickSequence(page, sequence) {
  for (const key of sequence) {
    await page.locator(`button[data-value="${key}"]`).click();
  }
}

test('Scenario 1: performs addition correctly', async ({ page }) => {
  await page.goto(baseURL);

  await clickSequence(page, ['7', '+', '5']);
  await page.locator('button[data-action="equals"]').click();

  await expect(page.locator('#expression')).toHaveText('7+5');
  await expect(page.locator('#display')).toHaveText('12');
});

test('Scenario 2: deletes the last entered digit', async ({ page }) => {
  await page.goto(baseURL);

  await clickSequence(page, ['9', '8']);
  await page.locator('button[data-action="delete"]').click();

  await expect(page.locator('#expression')).toHaveText('9');
  await expect(page.locator('#display')).toHaveText('9');
});

test('Scenario 3: clears the current input and can start fresh', async ({ page }) => {
  await page.goto(baseURL);

  await clickSequence(page, ['6', '*', '7']);
  await page.locator('button[data-action="clear"]').first().click();
  await clickSequence(page, ['4', '+', '3']);
  await page.locator('button[data-action="equals"]').click();

  await expect(page.locator('#expression')).toHaveText('4+3');
  await expect(page.locator('#display')).toHaveText('7');
});