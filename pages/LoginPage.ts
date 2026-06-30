import { expect, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    const usernameInput = this.page
      .locator('input[type="text"], input[name="username"], input[name="email"], input#username, input#email')
      .first();

    const passwordInput = this.page
      .locator('input[type="password"], input[name="password"], input#password')
      .first();

    await usernameInput.fill(username);
    await passwordInput.fill(password);

    await this.page
      .locator('button[type="submit"], button')
      .filter({ hasText: /login|log in|sign in/i })
      .first()
      .click();
  }

  async verifyLoginSuccessful() {
  await expect(this.page.getByRole('heading', { name: 'Projects' })).toBeVisible();

  await expect(
    this.page.getByRole('button', {
      name: /Web Application Main web application development/i,
    })
  ).toBeVisible();

  await expect(
    this.page.getByRole('button', {
      name: /Mobile Application Native mobile app development/i,
    })
  ).toBeVisible();

  await expect(this.page.getByRole('button', { name: /logout/i })).toBeVisible();
}
}