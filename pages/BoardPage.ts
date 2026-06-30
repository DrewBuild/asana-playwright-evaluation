import { expect, type Locator, type Page } from '@playwright/test';

export class BoardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToProject(projectName: string) {
    await this.page.getByText(projectName, { exact: true }).click();
    await expect(this.page.getByText(projectName, { exact: true })).toBeVisible();
  }

  getColumn(columnName: string): Locator {
    return this.page
      .locator('div')
      .filter({
        has: this.page.getByText(columnName, { exact: true }),
      })
      .first();
  }

  getTaskCard(taskName: string): Locator {
    return this.page
      .locator('div')
      .filter({
        has: this.page.getByText(taskName, { exact: true }),
      })
      .first();
  }

  async verifyTaskInColumn(taskName: string, columnName: string) {
    const column = this.getColumn(columnName);

    await expect(column.getByText(taskName, { exact: true })).toBeVisible();
  }

  async verifyTaskTags(taskName: string, tags: string[]) {
    const taskCard = this.getTaskCard(taskName);

    for (const tag of tags) {
      await expect(taskCard.getByText(tag, { exact: true })).toBeVisible();
    }
  }
}