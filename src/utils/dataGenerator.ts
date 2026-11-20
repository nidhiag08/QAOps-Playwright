import { CustomerInfo } from '../pages/saucedemo/CheckoutPage';

export function randomString(length = 6): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

export function randomCustomer(): CustomerInfo {
  return {
    firstName: `First${randomString(4)}`,
    lastName: `Last${randomString(4)}`,
    postalCode: String(Math.floor(10000 + Math.random() * 90000)),
  };
}
