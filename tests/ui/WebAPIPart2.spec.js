//Login UI -> .json

//test browser-> .json, cart order, order details, order history

// @ts-check
const { test, expect } = require('@playwright/test');

/** @type {import('@playwright/test').BrowserContext} */
let webContext;

test.beforeAll(async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("nidhiagrawal531@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Test@1234");
    await page.getByRole('button',{name: 'Login'}).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});

    //new context that starts already logged in, using the saved state.json
    webContext = await browser.newContext({storageState: 'state.json'});

});

test('@API Place Order', { tag: '@regression' }, async ()=>
   {
      
      const page = await webContext.newPage();
      await page.goto("https://rahulshettyacademy.com/client");

    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText: 'ZARA COAT 3'})
    .getByRole('button', {name: "Add To Cart"}).click();

    await page.getByRole("listitem").getByRole('button', {name: "Cart"}).click();

      await page.locator("div li").first().waitFor();
      await expect(page.getByText("Zara Coat 3")).toBeVisible();

      await page.getByRole('button', {name: "Checkout"}).click();
      await page.getByPlaceholder("Select country").pressSequentially("ind"); 
      // Presssequentially is used when we want to ent char one by one
      await page.getByRole('button', {name:"India"}).nth(1).click();
      await page.getByText("PLACE ORDER").click();
      await expect(page.getByText("Thankyou for the order.")).toBeVisible();

      const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
      console.log(orderId);

      await page.getByRole('button',{name: "ORDERS"}).click();
      await page.locator("tbody").waitFor();
      const rows = page.locator("tbody tr");
      for(let i=0; i<await rows.count(); ++i)
      {
         const rowOrderId = await rows.nth(i).locator("th").textContent();
         if(rowOrderId && orderId?.includes(rowOrderId))
         {
            await rows.nth(i).locator("button").first().click();
            break;
         }
         
      }

      const orderIdDetails = await page.locator(".col-text").textContent();
      expect(orderId).toContain(String(orderIdDetails));

      //await page.pause(); 

   });

   test('@API Get All Titles', { tag: '@regression' }, async ()=>
   {
      const productName = "ZARA COAT 3";
      const email = " "
      const page = await webContext.newPage();
      await page.goto("https://rahulshettyacademy.com/client");
      const products = page.locator(".card-body");
      const titles = await page.locator(".card-body b").allTextContents();
      console.log(titles);
   })
    


