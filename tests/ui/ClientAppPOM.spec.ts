import {expect} from '@playwright/test';
import { customTest } from '../../Utils_ts/test-base';
import { POManager} from '../../pageobjects_typescript/POManager';

//Serial is used when the tests are inter-dependent and if one failed, next execution will stop
customTest.describe.configure({mode: 'serial'});

//customTest is Playwright's test plus the testDataForOrder fixture; types for page and testDataForOrder come from it
customTest('@Web Client App place order', { tag: '@regression' }, 
   async ({page,testDataForOrder})=>
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
      //textContent() can return null, so fall back to an empty string
      const orderId = (await ordersReviewPage.SubmitAndGetOrderId()) ?? "";
      console.log(orderId);

      await dashboardPage.navigateToOrders();
      const orderHistoryPage = poManager.getOrderHistoryPage();
      await orderHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId).toContain(String(await orderHistoryPage.getOrderId()));

      //await page.pause(); 

   });
