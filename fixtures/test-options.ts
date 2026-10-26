// fixtures/fixtures.ts
import { test as base, expect } from '@playwright/test';
import { SearchResultsPage } from '../pages/search-results-page';
import { ManufacturerHomePage } from '../pages/manufacturer-home-page';
import { BasePage } from '../pages/base-page';
import { TradeSourceHomePage } from '../pages/tradesource-home-page';

// the types tell TypeScript what each fixture gives a test
type Fixtures = {
    searchResultsPage: SearchResultsPage;
    manufacturerHomePage: ManufacturerHomePage;
    basePage: BasePage;
    tradeSourceHomePage: TradeSourceHomePage;
};

export const test = base.extend<Fixtures>({
    // ==========================================================================
    // PAGE OBJECTS
    // each test that asks for one gets its own fresh instance, built from its page
    // ==========================================================================
    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },
    manufacturerHomePage: async ({ page }, use) => {
        await use(new ManufacturerHomePage(page));
    },
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    tradeSourceHomePage: async ({ page }, use) => {
        await use(new TradeSourceHomePage(page));
    }
});

export { expect } from "@playwright/test";
