import { test, expect } from '../fixtures/fixtures.ts';


test('Log in with a valid data', async ({ page, loginPage, standardUser }) => {
    await expect(page).toHaveURL(/inventory/);
});

test('Log in with invalid data', async ({ loginPage, invalidUser }) => {
    await expect(loginPage.errorMessage).toBeVisible();
});

test('User ordes an item', async ({ page, loginPage, standardUser, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
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

test('Remove order from the cart', async ({ page, loginPage, standardUser, inventoryPage, cartPage }) => {
    const itemTitle = 'Sauce Labs Onesie';
    
    await inventoryPage.addToCartByTitle(itemTitle);
    
    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart/);
    await expect(inventoryPage.cartItem).toHaveCount(1);

    await cartPage.removeFromCartByTitle(itemTitle);
    await expect(inventoryPage.cartItem).toHaveCount(0);
});

test('Remove order from Inventory page', async ({ loginPage, standardUser, inventoryPage }) => {
    const title = 'Sauce Labs Backpack';

    await inventoryPage.addToCartByTitle(title);

    await expect(inventoryPage.cartItemCount).toHaveCount(1);

    await inventoryPage.removeFromCartByTitle(title);
    await expect(inventoryPage.emptyCart).toBeVisible();
});
