import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { getEnv } from '../../utils/env';

export class PracticeLoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly error: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.signInButton = page.locator('#signInBtn');
    this.error = page.locator("[style*='block']");
    this.productTitles = page.locator('.card-body a');
  }

  async open() {
    await this.goto(getEnv('RSA_PRACTICE_URL'));
  }

  async login(user: string, pass: string) {
    await this.fill(this.username, user);
    await this.fill(this.password, pass);
    await this.signInButton.click();
  }

  async expectError(message: string | RegExp) {
    await expect(this.error).toContainText(message);
  }

  async getProductTitles(): Promise<string[]> {
    await this.productTitles.first().waitFor();
    return this.productTitles.allTextContents();
  }
}
