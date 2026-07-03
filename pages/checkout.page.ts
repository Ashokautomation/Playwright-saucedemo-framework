import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  private readonly page: Page;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly successHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successHeader = page.locator('.complete-header');
  }

  async fillInformation(first: string, last: string, zip: string): Promise<void> {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.postalCodeInput.fill(zip);
    await this.continueButton.click();
  }

  async completePayment(): Promise<void> {
    await this.finishButton.click();
  }

  async getSuccessText(): Promise<string> {
    return await this.successHeader.textContent() ?? '';
  }
}
