import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    private page: Page

    private itemCard: Locator;
    private itemTitle: Locator;
    private cart: Locator;
    public cartItem: Locator;
    public cartItemCount: Locator;
    public emptyCart: Locator;

    constructor(page: Page) {
        this.page = page;

        this.itemCard = page.locator('.inventory_item');
        this.itemTitle = page.locator('.inventory_item_name');
        this.cart = page.locator('.shopping_cart_link');
        this.cartItem = page.locator('.cart_item');
        this.cartItemCount = page.locator('.shopping_cart_link')
        this.emptyCart = page.locator('[aria-label="Cart, empty"]');
    }

    async openCart() {
        await this.cart.click();
    }

    async getItemsCount(): Promise<number> {
        return await this.itemCard.count();
    }

    async addToCartByTitle(productName: string) {
        const product = this.page.locator('.inventory_item')
            .filter({ hasText: productName });

        await product.locator('button').click();
    }

    async removeFromCartByTitle(productName: string) {
        const product = this.page.locator('.inventory_item')
            .filter({ hasText: productName });

        await product.getByRole('button', { name: 'Remove' }).click();
    }

    async getPriceByTitle(productName: string) {
        const product = this.page.locator('.inventory_item')
            .filter({ hasText: productName });

        return await product.locator('[data-test="inventory-item-price"]').textContent();
    }
}

