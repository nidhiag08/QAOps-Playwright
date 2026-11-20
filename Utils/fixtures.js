const base = require('@playwright/test');
const { request, expect } = require('@playwright/test');
const { APIUtils } = require('./APIUtils');

const loginPayload = {userEmail: "nidhiagrawal531@gmail.com", userPassword: "Test@1234"};
const orderPayload = {orders: [{country: "Brazil", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
//EventHub API login
const API_BASE_URL = "https://api.eventhub.rahulshettyacademy.com";
const credentials = {email: "nidhi@yopmail.com", password: "Test@1234"};

exports.customTest = base.test.extend({
    authenticatedPage: async ({ browser }, use) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("nidhiagrawal531@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Test@1234");
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await use(page);
    //runs after the test finishes
    await context.close();

},

//Tear Down - runs after the test finishes

createOrder: async ({}, use) => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    const response = await apiUtils.createOrder(orderPayload);

    //orderid
    await use(response);
    await apiContext.dispose();

},


testDataForOrder: {
    productName: 'ZARA COAT 3'
},

//API event-creation fixture — returns the created event's data
  createEvent: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext({ baseURL: API_BASE_URL });

    // confirmed response shape: { success, token, user: { id, email } }
    const loginRes = await apiContext.post('/api/auth/login', { data: credentials });
    const loginBody = await loginRes.json();
    const token = loginBody.token;

    const eventPayload = {
      title: `Automation Test Event ${Date.now()}`,
      description: 'Created by an automated Playwright fixture for testing.',
      category: 'Conference',
      venue: 'Bangalore International Centre',
      city: 'Bangalore',
      // always 30 days ahead — the API rejects dates in the past
      eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      price: 1500,
      totalSeats: 500,
      imageUrl: 'https://example.com/images/automation-event.jpg',
    };

    const createRes = await apiContext.post('/api/events', {
      data: eventPayload,
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await createRes.json();
    expect(createRes.ok(), JSON.stringify(body)).toBeTruthy();
    const event = body.data; // event object is nested under "data"

    await use(event);

    // teardown — clean up the event after the test finishes
    await apiContext.delete(`/api/events/${event.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await apiContext.dispose();
  },
});

exports.expect = expect;

