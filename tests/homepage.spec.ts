import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  // Переход на главную (baseURL подставится автоматически)
  await page.goto('/');

  // Проверки
  await expect(page).toHaveTitle('Vite + React + TS');
  await expect(page.getByTestId('logo')).toBeVisible();
});
