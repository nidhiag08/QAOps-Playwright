const { expect } = require('@playwright/test');
const { customTest } = require('../../Utils/fixtures.js');

customTest('fixture demo', { tag: '@regression' }, async ({ authenticatedPage, createOrder, testDataForOrder }) => {
    //Login to application and verify the order is created from history page
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("button[routerlink*='/myorders']").click();
    await expect(authenticatedPage.locator("tbody tr").first()).toBeVisible();
    await expect(authenticatedPage.getByText(createOrder.orderId).
        first()).toBeVisible();
    await expect(authenticatedPage.getByText(testDataForOrder.productName).first())
        .toBeVisible();

});

