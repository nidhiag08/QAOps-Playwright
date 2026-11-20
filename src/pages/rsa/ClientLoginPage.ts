import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { getEnv } from '../../utils/env';

export class ClientLoginPage extends BasePage {
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly toast: Locator;

  constructor(page: Page) {
    super(page);
    this.email = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.loginButton = page.locator("[value='Login']");
    this.toast = page.locator('#toast-container');
  }

  async open() {
    await this.goto(getEnv('RSA_URL'));
  }

  async login(email: string, password: string) {
    await this.fill(this.email, email);
    await this.fill(this.password, password);
    await this.loginButton.click();
  }

  async expectError(message: string | RegExp) {
    await expect(this.toast).toContainText(message);
  }
}
