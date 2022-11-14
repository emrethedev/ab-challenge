import { expect, Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const swagLabsBaseUrl = process.env.BASE_URL_SWAGLABS;

export class SwaglabsLoginPage {
  readonly page: Page;
  readonly dataTestUsername: Locator;
  readonly dataTestPassword: Locator;
  readonly dataTestLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dataTestUsername = page.locator('[data-test="username"]');
    this.dataTestPassword = page.locator('[data-test="password"]');
    this.dataTestLoginButton = page.locator('[data-test="login-button"]');
  }

  async login(username, password) {
    await this.page.goto(swagLabsBaseUrl);
    await this.dataTestUsername.click();
    await this.dataTestUsername.fill(username);
    await this.dataTestPassword.click();
    await this.dataTestPassword.fill(password);
    await this.dataTestLoginButton.click();
    await expect(this.page).toHaveURL(`${swagLabsBaseUrl}/inventory.html`);

  }
}