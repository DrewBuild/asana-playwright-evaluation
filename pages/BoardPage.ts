import { expect, type Locator, type Page } from '@playwright/test';

export class BoardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToProject(projectName: string) {
    const projectButton = this.page
      .getByRole('navigation')
      .getByRole('button', { name: new RegExp(projectName, 'i') });

    await projectButton.click();

    await expect(
      this.page.getByRole('banner').getByRole('heading', { name: projectName })
    ).toBeVisible();
  }

  getColumn(columnName: string): Locator {
    return this.page
      .locator('main')
      .locator('div')
      .filter({
        has: this.page.getByRole('heading', {
          name: new RegExp(`^${columnName}`),
        }),
      })
      .first();
  }

  getTaskCard(taskName: string): Locator {
    return this.page
      .getByRole('heading', { name: taskName, exact: true })
      .locator('..');
  }

  async verifyTaskInColumn(taskName: string, columnName: string) {
    const column = this.getColumn(columnName);

    await expect(
      column.getByRole('heading', { name: taskName, exact: true })
    ).toBeVisible();
  }

  async verifyTaskTags(taskName: string, tags: string[]) {
    const taskCard = this.getTaskCard(taskName);

    for (const tag of tags) {
      await expect(taskCard.getByText(tag, { exact: true })).toBeVisible();
    }
  }
}