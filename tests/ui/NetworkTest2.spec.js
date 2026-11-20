// @ts-check
const { test, expect, request } = require('@playwright/test');
test('@API Security Test Request intercept', { tag: '@regression' }, async ({ page }) => {

   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill("nidhiagrawal531@gmail.com");
   await page.getByPlaceholder("enter your passsword").fill("Test@1234");
   await page.getByRole('button', { name: 'Login' }).click();
   await page.waitForLoadState('networkidle');
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
      route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68a4561fd2e3f0f153b6fe15' }));
   await page.locator("button:has-text('View')").first().click();

   //await page.pause();


});



