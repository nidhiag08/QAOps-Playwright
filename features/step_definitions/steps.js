const { When, Then, Given, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');

setDefaultTimeout(100 * 1000);

Given('a login to Ecommerce application with {string} and {string}', async function (username, password)
{
    this.username = username;
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName)
{
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProduct(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productName)
{
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductsIsDisplayed(productName);
    await cartPage.CheckOut();
});

When('Enter valid details and Place the Order', async function ()
{
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    await ordersReviewPage.VerifyEmailId(this.username);
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify the order is present in OrderHistory', async function ()
{
    await this.dashboardPage.navigateToOrders();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId).toContain(String(await orderHistoryPage.getOrderId()));
});



Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password)
{
    const page = this.page;
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await page.locator('#username').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#signInBtn').click();
});

//expectedResult comes from the Examples table: "error" or "success"
Then('Verify login result is {string}', async function (expectedResult)
{
    const page = this.page;
    const errorBanner = page.locator("[style*='block']");
    if (expectedResult === 'error')
    {
        //wait until the error banner shows up, then capture its text
        await expect(errorBanner).toBeVisible();
        this.errorMessage = (await errorBanner.textContent()).trim();
        console.log('Error message: ' + this.errorMessage);
        expect(this.errorMessage).toContain('Incorrect');
    }
    else if (expectedResult === 'success')
    {
        //a successful login lands on the shop page with no error banner
        await expect(page).toHaveURL(/angularpractice\/shop/);
        await expect(errorBanner).not.toBeVisible();
    }
    else
    {
        throw new Error(`Unknown expected result "${expectedResult}" - use "error" or "success"`);
    }
});

Then('Verify error message is displayed', async function ()
{
    const errorBanner = this.page.locator("[style*='block']");
    await expect(errorBanner).toBeVisible();
    this.errorMessage = (await errorBanner.textContent()).trim();
    console.log('Error message: ' + this.errorMessage);
    expect(this.errorMessage).toContain('Incorrect');
});