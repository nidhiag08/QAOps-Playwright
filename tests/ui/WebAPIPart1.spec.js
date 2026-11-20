// @ts-check
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../../Utils/APIUtils');

const loginPayload = {userEmail: "nidhiagrawal531@gmail.com", userPassword: "Test@1234"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

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

test('@API Browsercontext-Validating error login', { tag: '@regression' }, async ({page})=>
   {
      
     await page.addInitScript(value =>
        {
            window.localStorage.setItem('token', value)
        }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");


      await page.locator("button[routerlink*='/myorders']").click();
      await page.locator("tbody").waitFor();
      const rows = page.locator("tbody tr");
      for(let i=0; i<await rows.count(); ++i)
      {
         const rowOrderId = await rows.nth(i).locator("th").textContent();
         if(rowOrderId && response.orderId.includes(rowOrderId))
         {
            await rows.nth(i).locator("button").first().click();
            break;
         }
         
      }

      const orderIdDetails = await page.locator(".col-text").textContent();
      expect(response.orderId.includes(String(orderIdDetails))).toBeTruthy();

      //await page.pause(); 




   });


