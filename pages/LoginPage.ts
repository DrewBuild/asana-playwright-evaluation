import { expect, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    await this.page.getByPlaceholder(/email|username/i).fill(email);
    await this.page.getByPlaceholder(/password/i).fill(password);
    await this.page.getByRole('button', { name: /login|sign in/i }).click();
  }

  async verifyLoginSuccessful() {
    await expect(this.page.getByText('Web Application')).toBeVisible();
    await expect(this.page.getByText('Mobile Application')).toBeVisible();
  }
}