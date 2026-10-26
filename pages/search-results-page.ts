// pages/search-results-page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

// SearchResultsPage is the page object for the search results shown after a search
export class SearchResultsPage extends BasePage {
  // ==========================================================================
  // LOCATORS
  // declared here as readonly properties, created from the page in the constructor
  // ==========================================================================
  readonly manufacturersTab: Locator;
  readonly vortixTile: Locator;

  constructor(page: Page) {
    super(page);
    this.manufacturersTab = page.getByRole('tab', { name: 'Manufacturer' });
    this.vortixTile = page.getByRole('link', { name: 'Vortix Vortix Commercial cleaning equipment, built for daily use' });
  }

  // ==========================================================================
  // METHODS
  // reusable actions, using the locators above
  // assertions belong in the spec files
  // ==========================================================================

  // click the Manufacturers tab
  async clickManufacturerTab() {
    await this.manufacturersTab.click();
  }

  // click the Vortix result tile
  async clickTile() {
    await this.vortixTile.click();
  }
}
