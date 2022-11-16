import { test, expect } from '@playwright/test';
import { SwaglabsLoginPage } from './pageobjects/swaglabs-login-page';
import dotenv from 'dotenv';

dotenv.config();

const standardUsername = process.env.STANDARD_USERNAME;
const standardPassword = process.env.STANDARD_PASSWORD;
const swagLabsBaseUrl = process.env.BASE_URL_SWAGLABS;

test.describe("Access SauceLabs Demo", () => {

  test('Visit Products/Inventory Page Unauthenticated', async ({ page }) => {
    await page.goto(`${swagLabsBaseUrl}/inventory.html`);
    await page.locator('form div:has-text("Epic sadface: You can only access \'/inventory.html\' when you are logged in.")').click();
    await page.locator('[data-test="error"]').getByRole('button').click();
  });

    test('Log in to SauceDemo with Standard User Account', async ({ page }) => {
        const swaglabsLoginPage = new SwaglabsLoginPage(page);
        await swaglabsLoginPage.login(standardUsername, standardPassword);
      });
      
})

