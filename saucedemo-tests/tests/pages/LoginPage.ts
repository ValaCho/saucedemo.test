import { Page, Locator } from '@playwright/test';

export class LoginPage {
    page: Page;

    userNameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    errorMessage: Locator;

    constructor(page:Page) {
        this.page = page;

        this.userNameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async login(userName: string, password: string) {
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async clearLoginForm() {
        await this.userNameInput.clear();
        await this.passwordInput.clear();
    }
}
