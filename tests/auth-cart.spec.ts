import test, { expect } from "@playwright/test";

test('user successfully login and adding product in cart', async({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('user-dropdown')).toBeVisible();
    await page.click('[data-testid="user-dropdown"]');
    await expect(page.getByTestId('dropdown-list')).toBeVisible();

    await expect(page.getByTestId('item-trigger').first()).toBeVisible();
    await page.click('[data-testid="item-trigger"]');

    await expect(page.getByTestId('auth-modal')).toBeVisible();

    await expect(page.getByTestId('username-input')).toHaveValue('johnd');
    await expect(page.getByTestId('password-input')).toHaveValue('m38rmF$');

    await page.click('[data-testid="login-submit-button"]');

    await expect(page.getByTestId('user-avatar')).toHaveText('J');

    // Проверка корзины

    const addCartButton = page.getByTestId('add-to-cart').nth(2);

    await expect(addCartButton).toBeVisible();

    await addCartButton.click()

    const cartLink = page.getByTestId('cart-link');

    await expect(cartLink).toBeVisible()

    await cartLink.click();

    const availabilityProduct = page.getByTestId('cart-count');

    await expect(availabilityProduct).toBeVisible();


})