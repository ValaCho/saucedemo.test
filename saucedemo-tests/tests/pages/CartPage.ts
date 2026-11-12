import { Page, Locator } from '@playwright/test';

export class CartPage {
    page: Page;

    checkoutButton: Locator;
    continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async removeFromCartByTitle(productName: string) {
        const product = this.page.locator('.cart_item')
            .filter({ hasText: productName });

        await product.locator('button').click();
    }

    async getPriceByTitle(productName: string) {
        const product = this.page.locator('.cart_item_label')
            .filter({ hasText: productName });

        return await product.locator('[data-test="inventory-item-price"]').textContent();
    }
}