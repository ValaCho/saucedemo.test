import { Page, Locator } from '@playwright/test';

export class CheckoutStepTwoPage {
    page: Page;

    itemQuantity: Locator;
    finishButton: Locator;
    completeHeader: Locator;
    generatePfdButton: Locator;
    backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.itemQuantity = page.locator('.cart_quantity');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('.complete-header');
        this.generatePfdButton = page.locator('[data-test="generate-pdf-order"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async getTotalPrice() {
        const total = await this.page
            .locator('[data-test="total-label"]')
            .textContent();

        return total?.match(/\d+\.\d{2}/)?.[0];
    }

    async submitOrder() {
        await this.finishButton.click();
    }

    async generatePfd() {
        await this.generatePfdButton.click();
    }

    async backHome() {
        await this.backHomeButton.click();
    }
}