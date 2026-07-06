import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

// 1. Build an array of different user journeys to run
const usersSuite = [
  { 
    username: 'standard_user', 
    type: 'valid', 
    itemToBuy: 'Sauce Labs Backpack', 
    sort: 'lohi' as const 
  },
  { 
    username: 'locked_out_user', 
    type: 'locked', 
    itemToBuy: '', 
    sort: 'az' as const 
  },
  { 
    username: 'problem_user', 
    type: 'valid', 
    itemToBuy: 'Sauce Labs Bike Light', 
    sort: 'za' as const 
  }
];

// 2. Loop through your dataset to auto-generate separate test items
for (const run of usersSuite) {
  test(`Data-driven suite scenario for profile: ${run.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Step A: Navigate & Attempt Login
        await loginPage.navigate();
        await loginPage.login(run.username, 'secret_sauce');

    if (run.type === 'valid') {
      // Step B: Verify routing onto dashboard
      await expect(page).toHaveURL(/.*inventory.html/);

      // Step C: Trigger your custom sort helper method
      await inventoryPage.selectSortOption(run.sort);

      // Step D: Add item using your smart string formatting locator
      await inventoryPage.addProductToCartByName(run.itemToBuy);

      // Step E: Step inside the cart workspace
      await inventoryPage.goToCart();
      await expect(page).toHaveURL(/.*cart.html/);

      // Step F: Gracefully exit session with your menu handlers
      await inventoryPage.logout();
      await expect(page).toHaveURL(/.*saucedemo.com\/?/);

    } else if (run.type === 'locked') {
      // Step G: Assert the expected fallback error for blocked context profiles
      const errorBanner = page.locator('[data-test="error"]');
      await expect(errorBanner).toBeVisible();
      await expect(errorBanner).toContainText('Sorry, this user has been locked out.');
    }
  });
}
