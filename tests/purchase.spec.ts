import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { VALID_USER } from '../data/users.data';

test.describe('E2E Procurement & Verification Suite', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login(VALID_USER.username, VALID_USER.password);
  });

  test('Should handle dropdown adjustments and verify Price Sorting (Low to High)', async () => {
    await inventoryPage.selectSortOption('lohi');
    const processedPrices = await inventoryPage.getAllItemPrices();
    const strictlySortedExpectation = [...processedPrices].sort((a, b) => a - b);
    expect(processedPrices).toEqual(strictlySortedExpectation);
  });

  test('Complete E2E checkout verification workflow followed by programmatic logout', async ({ page }) => {
    // Select specific products via data names safely
    await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
    await inventoryPage.addProductToCartByName('Test.allTheThings() T-Shirt (Red)');
    
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Populate tracking details
    await checkoutPage.fillInformation('Rahul', 'Sharma', '560001');
    await checkoutPage.completePayment();

    // Confirm UI state success
    const visualConfirmation = await checkoutPage.getSuccessText();
    expect(visualConfirmation).toBe('Thank you for your order!');

    // Close session securely
     await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
