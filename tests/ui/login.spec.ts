import { test, expect } from '@playwright/test';
import { SwaglabsLoginPage } from './pageobjects/swaglabs-login-page';
import dotenv from 'dotenv';

dotenv.config();

const standardUsername = process.env.STANDARD_USERNAME;
const standardPassword = process.env.STANDARD_PASSWORD;

test.describe("Log in to SauceLabs Demo", () => {

    test('Log in to SauceDemo with Standard User Account', async ({ page }) => {
        const swaglabsLoginPage = new SwaglabsLoginPage(page);
        await swaglabsLoginPage.login(standardUsername, standardPassword);
      });
      
})

