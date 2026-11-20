import { test, expect } from '@playwright/test';

test('@Web Playwright Special Locators', { tag: '@regression' }, async({page}) =>{


    test.setTimeout(60000);
    const slowExpect = expect.configure({timeout: 9000});
    page.setDefaultTimeout(9000);
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill("nidhi@yopmail.com");
    await page.locator("#password").fill("Test@1234");
    await page.getByRole('button',{name:"Sign In"}).click();

    await page.getByTestId("event-card").filter({hasText: 'World Tech Summit'})
    .getByRole('link', {name: "Book Now"}).click();

    await expect(page.getByText("This is a featured event — always available for practice")).toBeVisible({timeout: 20_000});

    await page.locator("#customerName").fill("Nidhi");
    await page.locator("#customer-email").fill("nidhi@yopmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("0000000000");
    await page.getByRole('button', {name: "Confirm Booking"}).click();

    const BookingRef = await page.locator(".booking-ref").textContent();
      console.log(BookingRef);

    await page.getByRole('button', {name: "View My Bookings"}).click();

   await expect(page.getByRole('heading', {name: "My Bookings"})).toBeVisible({timeout: 20_000});
      const rows = page.getByTestId("booking-card");
      await rows.first().waitFor();
      for(let i=0; i<await rows.count(); ++i)
      {
         const rowBookingId = await rows.nth(i).locator("span").first().textContent();
         if(rowBookingId && BookingRef?.includes(rowBookingId))
         {
            await rows.nth(i).locator("button").first().click();
            break;
         }
         
      }

      const bookingIdDetails = await page.locator("main nav span").last().textContent();
      expect(BookingRef).toContain(String(bookingIdDetails));
    //await page.pause();



}) 