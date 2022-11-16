import { test, expect } from '@playwright/test';
import { SwaglabsLoginPage } from './pageobjects/swaglabs-login-page';
import { SwaglabsInventoryPage } from './pageobjects/swaglabs-inventory-page';
import dotenv from 'dotenv';

dotenv.config();

const standardUsername = process.env.STANDARD_USERNAME;
const standardPassword = process.env.STANDARD_PASSWORD;
const swagLabsBaseUrl = process.env.BASE_URL_SWAGLABS;

test.beforeEach(async ({ page }) => {
    const swaglabsLoginPage = new SwaglabsLoginPage(page);
    await swaglabsLoginPage.login(standardUsername, standardPassword);
  });

  test('There is at least 1 in-stock item with pricing, cart and product info.', async ({ page }) => {
    await page.goto(`${swagLabsBaseUrl}/inventory.html`);
    await page.locator('.inventory_item').first().click();
    await page.getByText('$').first().click();
    await page.getByText('Add to cart').first().click();
    await page.getByText('Remove').first().click();
    // await expect(page).to(`.inventory_item_img`);
    await page.locator('.inventory_item_img').first().click();
    
  });

  test('Adding and removing item updates the button/shopping cart badge', async ({ page }) => {
    const swaglabsInventoryPage = new SwaglabsInventoryPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.getByText('Add to cart').first().click();
    const shoppingCartLinkLocator = page.locator('shopping_cart_link');
    await swaglabsInventoryPage.shoppingCartLink.click();
    await page.getByText('Remove').first().click();

    // await expect(page).toContain('[data-test="checkout"]')

    // TODO: fix shopping cart badge -- should not be shown once item removed from cart
    // await page.locator('.shopping_cart_badge').click();
  });

test('Viewing the cart with at least 1 item added', async ({ page }) => {

    await page.goto(`${swagLabsBaseUrl}/inventory.html`);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(`${swagLabsBaseUrl}/cart.html`);
    // await page.getByText('Continue ShoppingCheckout').click();
    const checkoutButtonLocator = page.locator('[data-test="checkout"]')
    await expect(checkoutButtonLocator).toBeVisible();
    // .click();
    // await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });

test('Checking out an item', async ({ page }) => {

  // TODO: Extract repeating lines into Page Object for D.R.Y. principles:
  
  const swaglabsInventoryPage = new SwaglabsInventoryPage(page);

  await page.goto(`${swagLabsBaseUrl}/inventory.html`);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await swaglabsInventoryPage.shoppingCartLink.click();
  // await page.locator('a:has-text("1")').click();
  // TODO add page object
  await expect(page).toHaveURL(`${swagLabsBaseUrl}/cart.html`);

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(`${swagLabsBaseUrl}/checkout-step-one.html`);

  await page.locator('[data-test="firstName"]').click();

  await page.locator('[data-test="firstName"]').fill('firstname');

  // await page.locator('[data-test="firstName"]').press('Tab');

  await page.locator('[data-test="lastName"]').click();

  await page.locator('[data-test="lastName"]').fill('lastname');

  await page.locator('[data-test="postalCode"]').click();

  await page.locator('[data-test="postalCode"]').fill('99999');

  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL(`${swagLabsBaseUrl}/checkout-step-two.html`);

  // await page.getByRole('link', { name: 'Sauce Labs Backpack' }).click();
  // await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');

  await page.goto(`${swagLabsBaseUrl}/checkout-step-two.html`);

  await page.getByText('Item total: $29.99').click();

  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL(`${swagLabsBaseUrl}/checkout-complete.html`);

  await page.getByRole('heading', { name: 'THANK YOU FOR YOUR ORDER' }).click();

  await page.locator('[data-test="back-to-products"]').click();
  await expect(page).toHaveURL(`${swagLabsBaseUrl}/inventory.html`);

});