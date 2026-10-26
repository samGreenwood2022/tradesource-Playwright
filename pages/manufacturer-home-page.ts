// pages/manufacturer-home-page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
 
export class ManufacturerHomePage extends BasePage {
  // ==========================================================================
  // LOCATORS
  // exposed directly — a Playwright locator is lazy, so no getter methods are needed
  // ==========================================================================
  readonly h1Header: Locator;
  readonly h1HeaderParagraph: Locator;
  readonly telephoneButton: Locator;
  readonly companyWebsiteLink: Locator;
  readonly contactManufacturerButton: Locator;
  readonly signInRequiredModal: Locator;
 
  constructor(page: Page) {
    super(page);
    this.h1Header = page.getByRole('heading', { level: 1 });
    this.h1HeaderParagraph = page.getByText('Commercial cleaning equipment, built for daily use', { exact: true });
    this.telephoneButton = page.getByRole('link', { name: '08001234567' });
    this.companyWebsiteLink = page.getByRole('link', { name: 'Website' });
    this.contactManufacturerButton = page.getByRole('button', { name: 'Contact manufacturer' });
    this.signInRequiredModal = page.getByRole('heading', { name: 'Sign in required' });
  }
 
  // ==========================================================================
  // METHODS
  // page-specific actions go here as they're needed
  // assertions belong in the spec files
  // ==========================================================================
  async clickContactManufacturer() {
    await this.contactManufacturerButton.click();
  }
}
