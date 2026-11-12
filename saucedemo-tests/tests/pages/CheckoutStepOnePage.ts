import { Page, Locator } from '@playwright/test';

export class CheckoutStepOnePage {
    page: Page;

    firstNameInput: Locator;
    lastNameInput: Locator;
    zipCodeInput: Locator;
    continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.getByLabel('First Name');
        this.lastNameInput = page.getByLabel('Last Name');
        this.zipCodeInput = page.getByLabel('Zip/Postal Code');
        this.continueButton = page.locator('[data-test="continue"]');
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillZipCode(zipCode: string) {
        await this.zipCodeInput.fill(zipCode);
    }

    async continue() {
        await this.continueButton.click();
    }


}