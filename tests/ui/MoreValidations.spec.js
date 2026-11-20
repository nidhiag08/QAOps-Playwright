const {test, expect} = require('@playwright/test')

test("popup validations", { tag: '@regression' }, async({page})=>
{
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

//To handle JS popups
page.on('dialog', dialog=>dialog.accept());

await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();

//switching to child frame- iframe or frame within main page
const framesPage = page.frameLocator("#courses-iframe");
await framesPage.locator("li a[href*='lifetime-access']:visible").click();
const textCheck = await framesPage.locator(".text h2").textContent();
console.log(textCheck?.split(" ")[1]);

})

test("screenshot and visual comparison", { tag: '@regression' }, async({page})=>
{
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator("#displayed-text")).toBeVisible();
  //screenshot of just this element — taken before it gets hidden
  await page.locator("#displayed-text").screenshot({path: 'partial-screenshot.png'});
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  //full page screenshot
  await page.screenshot({path: 'screenshot.png'});
  await expect(page).toHaveScreenshot('screenshot.png');
});

test('visual', { tag: '@regression' }, async ({ page }) => {
  await page.goto('https://flightaware.com/');
  expect(await page.screenshot()).toMatchSnapshot('landing.png');
});