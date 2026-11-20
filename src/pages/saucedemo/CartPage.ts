import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class CartPage extends BasePage {
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectItem(productName: string) {
    await expect(this.items.filter({ hasText: productName })).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
