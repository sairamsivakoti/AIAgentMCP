const { test, expect } = require('@playwright/test');

test('sign in, add iPhone X to cart, and confirm checkout', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('Learning@830$3mK2');
  await page.locator('#terms').check();
  await page.locator('#signInBtn').click();

  await page.waitForURL(/angularpractice\/shop/, { timeout: 20000 });
  await expect(page).toHaveURL(/angularpractice\/shop/);

  const productCard = page.locator('app-card').filter({
    has: page.locator('h4', { hasText: 'iphone X' }),
  });
  await expect(productCard).toBeVisible();
  await productCard.getByRole('button', { name: /add/i }).click();
  await page.waitForTimeout(3000);

  const cartLink = page.locator('a').filter({ hasText: /checkout/i }).first();
  await expect(cartLink).toBeVisible({ timeout: 10000 });
  await cartLink.click();
  await page.waitForTimeout(3000);

  await expect(page.locator('body')).toContainText('iphone X');
  await expect(page.locator('body')).toContainText('Checkout');
});
