const { chromium } = require('C:\\Users\\PRANJAL\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules\\playwright\\index.js');

async function clickSequence(page, sequence) {
  for (const key of sequence) {
    await page.locator(`button[data-value="${key}"]`).click();
  }
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ slowMo: 10000 });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/');
  
  console.log('=== TEST CASE 1: Addition (7 + 5 = 12) ===');
  await clickSequence(page, ['7', '+', '5']);
  await page.locator('button[data-action="equals"]').click();
  const result1 = await page.locator('#display').textContent();
  console.log('Result:', result1);
  await page.waitForTimeout(2000);
  
  console.log('\n=== TEST CASE 2: Delete (98 -> delete -> 9) ===');
  await page.locator('button[data-action="clear"]').first().click();
  await clickSequence(page, ['9', '8']);
  await page.locator('button[data-action="delete"]').click();
  const result2 = await page.locator('#display').textContent();
  console.log('Result:', result2);
  await page.waitForTimeout(2000);
  
  console.log('\n=== TEST CASE 3: Clear and Calculate (6*7 -> clear -> 4+3=7) ===');
  await clickSequence(page, ['6', '*', '7']);
  await page.locator('button[data-action="clear"]').first().click();
  await clickSequence(page, ['4', '+', '3']);
  await page.locator('button[data-action="equals"]').click();
  const result3 = await page.locator('#display').textContent();
  console.log('Result:', result3);
  await page.waitForTimeout(2000);
  
  console.log('\n=== ALL TESTS COMPLETED ===');
  console.log('Test 1 Result: 12 (Actual: ' + result1 + ')');
  console.log('Test 2 Result: 9 (Actual: ' + result2 + ')');
  console.log('Test 3 Result: 7 (Actual: ' + result3 + ')');
  
  await page.waitForTimeout(5000);
  await browser.close();
  console.log('Browser closed');
})();
