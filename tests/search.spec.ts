import test, { expect } from "@playwright/test";

test('user can search products', async ({ page }) => {
  await page.goto('/');

  await page.fill('[data-testid="search-input"]', 'Fjallraven');
  await expect(page.getByTestId('input-dropdown')).toBeVisible();
  await expect(page.getByTestId('search-trigger').first()).toBeVisible();
});