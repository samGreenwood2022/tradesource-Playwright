// pages/tradesource-home-page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

// TradeSource home page object model
export class TradeSourceHomePage extends BasePage {

    // ==========================================================================
    // LOCATORS
    // declared here as readonly properties, created from the page in the constructor
    // ==========================================================================
    readonly searchField: Locator;

    constructor(page: Page) {
        super(page);
        this.searchField = page.getByTestId('search-input').filter({ visible: true });
    }

    // ==========================================================================
    // METHODS
    // assertions belong in the spec files
    // ==========================================================================

    // type a search term into the visible search box and hit enter
    async searchFor(term: string) {
        await this.searchField.fill(term);
        await this.searchField.press('Enter');
    }

}