import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  private readonly shoppingCartLink: Locator;
  private readonly sortDropdown: Locator;
  private readonly itemPrices: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('.inventory_item_price');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async selectSortOption(optionValue: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllItemPrices(): Promise<number[]> {
    const priceElements = await this.itemPrices.allTextContents();
    return priceElements.map(priceStr => parseFloat(priceStr.replace('$', '')));
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="add-to-cart-${formattedName}"]`).click();
  }

  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    // Forces Playwright to wait for the sidebar animation to finish
  await this.logoutLink.waitFor({ state: 'visible' }); 
  await this.logoutLink.click();
  }
}
