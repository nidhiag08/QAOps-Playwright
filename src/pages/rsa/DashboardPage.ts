import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class DashboardPage extends BasePage {
  readonly productTitles: Locator;
  readonly cards: Locator;
  readonly toast: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitles = page.locator('.card-body b');
    this.cards = page.locator('.card-body');
    this.toast = page.locator('#toast-container');
  }

  async expectLoaded() {
    await this.expectUrlContains('dashboard');
    await expect(this.productTitles.first()).toBeVisible();
  }

  async getProductTitles(): Promise<string[]> {
    return this.productTitles.allTextContents();
  }

  async addToCart(productName: string) {
    await this.cards.filter({ hasText: productName }).getByRole('button', { name: 'Add To Cart' }).click();
  }

  async expectToast(message: string | RegExp) {
    await expect(this.toast).toContainText(message);
  }
}
