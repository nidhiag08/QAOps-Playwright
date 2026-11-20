import { test } from '../../../src/fixtures/baseFixture';
import { getEnv } from '../../../src/utils/env';
import users from '../../../test-data/users.json';

test.describe('Login', { tag: '@regression' }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid user can log in @smoke', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(getEnv('STANDARD_USER'), getEnv('PASSWORD'));
    await inventoryPage.expectLoaded();
  });

  // Data-driven test
  for (const { username, password, error } of users.invalidLogins) {
    test(`shows error for "${username || '<empty>'}" @regression`, async ({ loginPage }) => {
      await loginPage.login(username, password);
      await loginPage.expectError(error);
    });
  }
});
