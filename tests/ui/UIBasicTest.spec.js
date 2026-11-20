// @ts-check
const { test, expect } = require('@playwright/test');

test('Browsercontext-Validating error login', { tag: '@regression' }, async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   //await page.route('**/*.{jpg,png,gif}', route => route.abort()); //block image requests
   const userName = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const cardTitles = page.locator('.card-body a');

   //Listeners for API Calls
   page.on('request', request => console.log(request.method(), request.url()));
   page.on('response', response => console.log(response.status(), response.url()));

   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   console.log(await page.title());


   await userName.fill('rahulshetty');
   await page.locator('#password').fill('Learning@830$3mK2');
   await signIn.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');

   //fill - clears the input field and types the new value

   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await signIn.click();
   console.log(await page.locator(".card-body a").first().textContent());
   console.log(await page.locator(".card-body a").nth(1).textContent());
   const allTitles = await cardTitles.allTextContents();
   console.log(allTitles);

});

test('UI Controls', { tag: '@regression' }, async ({ page }) => {
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   //const password = page.locator('#password');
   const dropdown = page.locator("select.form-control");
   await dropdown.selectOption('consult');
   const documentLink = page.locator("a[href*='documents-request']");
   await page.locator('.radiotextsty').last().click();
   await page.locator('#okayBtn').click();

   //Assertion
   console.log(await page.locator('.radiotextsty').last().isChecked());
   await expect(page.locator('.radiotextsty').last()).toBeChecked();
   await page.locator('#terms').click();
   await expect(page.locator('#terms')).toBeChecked();
   await page.locator('#terms').uncheck();
   await expect(page.locator('#terms')).not.toBeChecked();

   await expect(documentLink).toHaveAttribute('class', 'blinkingText');

   // await page.pause(); // uncomment to step through in the Inspector
})


test('Child windows', { tag: '@regression' }, async ({ browser }) => {

   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   const documentLink = page.locator("a[href*='documents-request']");

   const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      documentLink.click(),
   ]); //Listen to page event and click on the link to open new tab

   //conetxt to new page opening in another tab

   const text = (await newPage.locator('.red').textContent()) ?? '';
   const arrayText = text.split('@');
   const domain = arrayText[1].split(' ')[0];
   //console.log(domain);

   await page.locator('#username').fill(domain);
   console.log(await page.locator('#username').inputValue());

});
