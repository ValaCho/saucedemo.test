import { Page, Locator } from '@playwright/test';

export class CartPage {
    page: Page;

    checkoutButton: Locator;
    continueShoppingButton: Locator;
    cartItem: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.cartItem = page.locator('.cart_item');
    }

    async checkout() {
        await this.checkoutButton.click();
    }
    
    async getItemsCount(): Promise<number> {
        return await this.cartItem.count();
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