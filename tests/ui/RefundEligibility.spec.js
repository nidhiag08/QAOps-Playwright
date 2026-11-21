import { test, expect } from '@playwright/test';

const BASE_URL   = 'https://eventhub.rahulshettyacademy.com';
const API_URL    = 'https://api.eventhub.rahulshettyacademy.com/api';

// Change these to match a registered account in your local sandbox
const GMAIL_USER = { email: 'nidhi@yopmail.com', password: 'Test@1234' };

async function loginAndGoToBooking(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByLabel('Email').fill(GMAIL_USER.email);
  await page.getByPlaceholder('••••••').fill(GMAIL_USER.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

// The events are shared with everyone practising on this site, so seat counts change all the time.
// Ask the API for an event that still has enough seats instead of always taking the first card.
async function findEventWithSeats(request, seatsNeeded) {
  const loginRes = await request.post(`${API_URL}/auth/login`, {
    data: { email: GMAIL_USER.email, password: GMAIL_USER.password },
  });
  expect(loginRes.ok()).toBeTruthy();
  const { token } = await loginRes.json();
  const eventsRes = await request.get(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(eventsRes.ok()).toBeTruthy();
  const event = (await eventsRes.json()).data.find(e => e.availableSeats >= seatsNeeded);
  expect(event, `no event with ${seatsNeeded}+ available seats`).toBeTruthy();
  return event.id;
}

// ── Test 1: 1 ticket → eligible ───────────────────────────────────────────────
test('@Web refund eligible for single ticket booking', { tag: '@regression' }, async ({ page, request }) => {
  await loginAndGoToBooking(page);

  // Book event with 1 ticket via UI
  const eventId = await findEventWithSeats(request, 1);
  await page.goto(`${BASE_URL}/events/${eventId}`);


  await page.getByLabel('Full Name').fill('Test User');
  await page.locator('#customer-email').fill(GMAIL_USER.email);
  await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
  await page.locator('.confirm-booking-btn').click();

  // Navigate to booking detail
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  // Validate booking ref first letter matches event name first letter
  const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  const eventTitle = await page.locator('h1').innerText();
  expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

  await page.locator('#check-refund-btn').click();

  // Spinner must appear immediately
  await expect(page.locator('#refund-spinner')).toBeVisible();

  // Wait for spinner to disappear after 4s
  await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

  // Validate eligible message
  const result = page.locator('#refund-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('Eligible for refund');
  await expect(result).toContainText('Single-ticket bookings qualify for a full refund');
});

// ── Test 2: 3 tickets → not eligible ─────────────────────────────────────────
test('refund not eligible for group ticket booking', { tag: '@regression' }, async ({ page, request }) => {
  await loginAndGoToBooking(page);

  // Book event with 3 tickets via UI
  const eventId = await findEventWithSeats(request, 3);
  await page.goto(`${BASE_URL}/events/${eventId}`);


  // Increase quantity to 3
  await page.locator('button:has-text("+")').click();
  await page.locator('button:has-text("+")').click();

  await page.getByLabel('Full Name').fill('Test User');
  await page.locator('#customer-email').fill(GMAIL_USER.email);
  await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
  await page.locator('.confirm-booking-btn').click();

  // Navigate to booking detail
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  // Validate booking ref first letter matches event name first letter
  const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  const eventTitle = await page.locator('h1').innerText();
  expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

  await page.locator('#check-refund-btn').click();

  // Spinner must appear immediately
  await expect(page.locator('#refund-spinner')).toBeVisible();

  // Wait for spinner to disappear after 4s
  await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

  // Validate ineligible message
  const result = page.locator('#refund-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('Not eligible for refund');
  await expect(result).toContainText('Group bookings (3 tickets) are non-refundable');
});