import { test, expect } from '../../../src/fixtures/baseFixture';
import products from '../../../test-data/products.json';

test.describe('Inventory', { tag: '@regression' }, () => {
  test('sort by price low to high @regression', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('lohi');
    const prices = await loggedInPage.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('add item updates cart badge @smoke', async ({ loggedInPage }) => {
    await loggedInPage.addToCart(products.backpack);
    await expect(loggedInPage.cartBadge).toHaveText('1');
  });
});
