import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
