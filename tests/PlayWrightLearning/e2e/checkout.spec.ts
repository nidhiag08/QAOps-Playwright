import { test, expect } from '../../../src/fixtures/baseFixture';
import { randomCustomer } from '../../../src/utils/dataGenerator';
import products from '../../../test-data/products.json';

test('user can purchase products end to end @e2e', { tag: '@regression' }, async ({ loggedInPage, cartPage, checkoutPage }) => {
  await test.step('add products to cart', async () => {
    await loggedInPage.addToCart(products.backpack);
    await loggedInPage.addToCart(products.bikeLight);
    await expect(loggedInPage.cartBadge).toHaveText('2');
  });

  await test.step('verify cart', async () => {
    await loggedInPage.openCart();
    await cartPage.expectItem(products.backpack);
    await cartPage.expectItem(products.bikeLight);
    await cartPage.checkout();
  });

  await test.step('complete checkout', async () => {
    await checkoutPage.fillInfo(randomCustomer());
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });
});
