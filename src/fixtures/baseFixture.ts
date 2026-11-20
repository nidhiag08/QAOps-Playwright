import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/saucedemo/LoginPage';
import { InventoryPage } from '../pages/saucedemo/InventoryPage';
import { CartPage } from '../pages/saucedemo/CartPage';
import { CheckoutPage } from '../pages/saucedemo/CheckoutPage';
import { ClientLoginPage } from '../pages/rsa/ClientLoginPage';
import { DashboardPage } from '../pages/rsa/DashboardPage';
import { PracticeLoginPage } from '../pages/rsa/PracticeLoginPage';
import { PostsClient } from '../api/PostsClient';
import { getEnv } from '../utils/env';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loggedInPage: InventoryPage;
  postsClient: PostsClient;
  clientLoginPage: ClientLoginPage;
  dashboardPage: DashboardPage;
  practiceLoginPage: PracticeLoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),

  // Lands on the inventory page already authenticated.
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(getEnv('STANDARD_USER'), getEnv('PASSWORD'));
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();
    await use(inventory);
  },

  postsClient: async ({ request }, use) => use(new PostsClient(request)),

  // Rahul Shetty Academy client app
  clientLoginPage: async ({ page }, use) => use(new ClientLoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  practiceLoginPage: async ({ page }, use) => use(new PracticeLoginPage(page)),
});

export { expect } from '@playwright/test';
