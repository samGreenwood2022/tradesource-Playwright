// pages/manufacturer-home-page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

// ManufacturerHomePage is the page object for a manufacturer's overview page (e.g. Vortix)
export class ManufacturerHomePage extends BasePage {
  // ==========================================================================
  // LOCATORS
  // declared here as readonly properties, created from the page in the constructor
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
  // reusable actions, using the locators above
  // assertions belong in the spec files
  // ==========================================================================

  // click the Contact manufacturer button
  async clickContactManufacturer() {
    await this.contactManufacturerButton.click();
  }
}
