// pages/search-results-page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
 
export class SearchResultsPage extends BasePage {
  // ==========================================================================
  // LOCATORS
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
