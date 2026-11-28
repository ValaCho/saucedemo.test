import { test, expect } from "../fixtures/fixtures.ts";
import { users } from "../test-data/users";

test.describe("Standard user tests", () => {
  test.use({ user: users.standardUser });

  test("Log in with a valid data", async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
  });

  test("User ordes an item", async ({
    page,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
    await inventoryPage.addToCartByTitle("Sauce Labs Fleece Jacket");

    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart/);
    await expect(inventoryPage.cartItem).toHaveCount(1);

    await cartPage.checkout();

    await checkoutStepOnePage.fillFirstName("Lala");
    await checkoutStepOnePage.fillLastName("Linua");
    await checkoutStepOnePage.fillZipCode("09568");
    await checkoutStepOnePage.continue();

    await checkoutStepTwoPage.submitOrder();
    await expect(checkoutStepTwoPage.completeHeader).toBeVisible();
  });

  test("Remove order from the cart", async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    const itemTitle = "Sauce Labs Onesie";

    await inventoryPage.addToCartByTitle(itemTitle);

    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart/);
    await expect(inventoryPage.cartItem).toHaveCount(1);

    await cartPage.removeFromCartByTitle(itemTitle);
    await expect(inventoryPage.cartItem).toHaveCount(0);
  });

  test("Remove order from Inventory page", async ({ inventoryPage }) => {
    const title = "Sauce Labs Backpack";

    await inventoryPage.addToCartByTitle(title);

    await expect(inventoryPage.cartItemCount).toHaveCount(1);

    await inventoryPage.removeFromCartByTitle(title);
    await expect(inventoryPage.emptyCart).toBeVisible();
  });
});

test.describe("Invalid user tests", () => {
  test.use({ user: users.invalidUser });

  test("Login with invalid credentials", async ({ loginPage }) => {
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
