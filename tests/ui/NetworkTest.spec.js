// @ts-check
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../../Utils/APIUtils');

const loginPayload = {userEmail: "nidhiagrawal531@gmail.com", userPassword: "Test@1234"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakeOrderPayload = {data: [], message: "No Orders"};
/** @type {{token: string, orderId: string}} */
let response;

test.beforeAll(async () => {
  // Execution once before all tests
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test.beforeEach(async ()=>
{
//will execute everytime before each test


});

//create order is success

test('@API Place the order', { tag: '@regression' }, async ({page})=>
   {
      
     await page.addInitScript(value =>
        {
            window.localStorage.setItem('token', value)
        }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    //Network interception
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6ae4d17ea90a419aa835fcc8*", 
      async route=>
   {
      //intercepting the network call and mocking the response
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakeOrderPayload);
      await route.fulfill({
         response,
         body,
      });
   }
   
   );

      //start listening before the click so the response can't be missed
      const ordersResponse = page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6ae4d17ea90a419aa835fcc8");
      await page.locator("button[routerlink*='/myorders']").click();
      await ordersResponse;
      console.log(await page.locator(".mt-4").textContent());
      
      //await page.pause(); 
   });


