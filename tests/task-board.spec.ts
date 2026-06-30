import { test } from '@playwright/test';
import { taskScenarios } from '../data/taskScenarios';
import { LoginPage } from '../pages/LoginPage';
import { BoardPage } from '../pages/BoardPage';

test.describe('Asana-like task board validation', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('admin', 'password123');
    await loginPage.verifyLoginSuccessful();
  });

  for (const scenario of taskScenarios) {
    test(`Verify "${scenario.task}" is in ${scenario.project} > ${scenario.column}`, async ({ page }) => {
      const boardPage = new BoardPage(page);

      await boardPage.navigateToProject(scenario.project);
      await boardPage.verifyTaskInColumn(scenario.task, scenario.column);
      await boardPage.verifyTaskTags(scenario.task, scenario.tags);
    });
  }
});