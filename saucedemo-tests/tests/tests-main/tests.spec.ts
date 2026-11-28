import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage'
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage'; 
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage'; 

test('Log in with a valid data', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
});

test('Log in with invalid data', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login('standard', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
});

test('User ordes an item', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

  await page.goto('/');

  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCartByTitle('Sauce Labs Fleece Jacket');

  await inventoryPage.openCart();
  await expect(page).toHaveURL(/cart/);
  await expect(inventoryPage.cartItem).toHaveCount(1);

  await cartPage.checkout();

  await checkoutStepOnePage.fillFirstName('Lala');
  await checkoutStepOnePage.fillLastName('Linua');
  await checkoutStepOnePage.fillZipCode('09568');
  await checkoutStepOnePage.continue();

  await checkoutStepTwoPage.submitOrder();
  await expect(checkoutStepTwoPage.completeHeader).toBeVisible();
});

test('Remove order from the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const itemTitle = 'Sauce Labs Onesie';
    
    await page.goto('/');

    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addToCartByTitle(itemTitle);
    
    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart/);
    await expect(inventoryPage.cartItem).toHaveCount(1);

    await cartPage.removeFromCartByTitle(itemTitle);
    await expect(inventoryPage.cartItem).toHaveCount(0);
});

test('Remove order from Inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const title = 'Sauce Labs Backpack';

    await page.goto('/');

    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addToCartByTitle(title);

    await expect(inventoryPage.cartItemCount).toHaveCount(1);

    await inventoryPage.removeFromCartByTitle(title);
    await expect(inventoryPage.emptyCart).toBeVisible();
});