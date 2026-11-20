const { expect } = require('@playwright/test');
const { customTest } = require('../../Utils/fixtures.js');

customTest('newly created event should appear on the events page', { tag: '@regression' }, async ({ page, createEvent }) => {
  //EventHub needs its own login — authenticatedPage is logged into the shop site
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill('nidhi@yopmail.com');
  await page.locator('#password').fill('Test@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  //wait for login to finish, otherwise /events redirects back to the login page
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

  await page.goto('https://eventhub.rahulshettyacademy.com/events');
  await expect(page.getByText(createEvent.title)).toBeVisible();
});
