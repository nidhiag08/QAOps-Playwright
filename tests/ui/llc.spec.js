import { test, expect } from '@playwright/test';

test('Playwright Special Locators', { tag: '@regression' }, async({page}) =>{


    test.setTimeout(60000);
    const slowExpect = expect.configure({timeout: 9000});
    page.setDefaultTimeout(9000);
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name: 'Submit'}).click(); 
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    

    await page.getByRole("link",{name: 'Shop'}).click();
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    

});