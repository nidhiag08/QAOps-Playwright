// @ts-check
const { test, expect } = require('@playwright/test');

test('Browsercontext-Validating error login', { tag: '@regression' }, async ({page})=>
   {
      
      const products = page.locator(".card-body");
      const productName = "ZARA COAT 3";
      const email = "nidhiagrawal531@gmail.com"

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("nidhiagrawal531@gmail.com")
    await page.locator("#userPassword").fill("Test@1234");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const Count = await products.count();
    console.log(Count);
      for(let i=0; i<Count; ++i)
      {
        if( await products.nth(i).locator("b").textContent() === productName)
        {
         //add product to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
        }

      }

      await page.locator("[routerlink*='cart']").click();
      await page.locator("div li").first().waitFor();
      const bool = await page.locator(`h3:has-text('${productName}')`).isVisible();
      expect(bool).toBeTruthy();

      await page.locator("text=Checkout").click();
      await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100}); 
      // Presssequentially is used when we want to ent char one by one
      const dropdown = page.locator(".ta-results");
      await dropdown.waitFor();
      const optionsCount = await dropdown.locator("button").count();
      for(let i=0; i<optionsCount; ++i)
      {
         const text = await dropdown.locator("button").nth(i).textContent();
         if(text === " India")
         {
            await dropdown.locator("button").nth(i).click();
            break;
         }
      }

      await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
      await page.locator(".action__submit").click();

      await expect(page.locator(".hero-primary").first()).toHaveText("Thankyou for the order.");
      const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
      console.log(orderId);

      await page.locator("button[routerlink*='/myorders']").click();
      await page.locator("tbody").waitFor();
      const rows = await page.locator("tbody tr");
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


