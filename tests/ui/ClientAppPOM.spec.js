const { expect } = require('@playwright/test');
const {test} = require("../../Utils/test-base.js");
const { POManager} = require('../../pageobjects/POManager');
test.describe.configure({mode: 'serial'});

test('@Web Client App place order', { tag: '@regression' }, async ({page,testDataForOrder})=>
   {
      const poManager = new POManager(page);
      const loginPage = poManager.getLoginPage();

      await loginPage.goTo();
      await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
      const dashboardPage = poManager.getDashboardPage();
      await dashboardPage.searchProduct(testDataForOrder.productName);
      await dashboardPage.navigateToCart();
      const cartPage = poManager.getCartPage();
      await cartPage.VerifyProductsIsDisplayed(testDataForOrder.productName);
      await cartPage.CheckOut();
      const ordersReviewPage = poManager.getOrdersReviewPage();
      await ordersReviewPage.searchCountryAndSelect("ind","India");
      await ordersReviewPage.VerifyEmailId(testDataForOrder.username);
      const orderId = await ordersReviewPage.SubmitAndGetOrderId();
      console.log(orderId);

      await dashboardPage.navigateToOrders();
      const orderHistoryPage = poManager.getOrderHistoryPage();
      await orderHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId).toContain(String(await orderHistoryPage.getOrderId()));

      //await page.pause(); 

   });
