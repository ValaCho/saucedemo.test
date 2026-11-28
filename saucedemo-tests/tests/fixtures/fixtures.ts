import { test as base, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { users } from "../test-data/users";

type User = {
  userName: string;
  password: string;
};

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;

  user: User;
  autoLogin: void;
  logout: void;
};

export const test = base.extend<MyFixtures>({
  // Page Objects
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);

    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);

    await use(cartPage);
  },

  checkoutStepOnePage: async ({ page }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);

    await use(checkoutStepOnePage);
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

    await use(checkoutStepTwoPage);
  },

  // Selected user
  user: async ({}, use) => {
    await use(users.standardUser);
  },

  // Automatic login
  autoLogin: [
    async ({ page, loginPage, user }, use) => {

      await page.goto('/');

      await loginPage.login(
        user.userName,
        user.password
      );

      await use();
    },
    { auto: true }
  ],

    // Automatic logout
    logout: [
    async ({ page }, use) => {

      await use();

      const userMenu = page.locator('[id="menu_button_container"]');

      if (await userMenu.isVisible()) {
        await userMenu.click();
        await page.getByTestId('logout-sidebar-link').click();
      }
    },
    { auto: true }
  ]
});

export { expect };



