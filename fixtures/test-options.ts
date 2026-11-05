// fixtures/test-options.ts
import { test as base } from '@playwright/test';
import { SearchResultsPage } from '../pages/search-results-page';
import { ManufacturerHomePage } from '../pages/manufacturer-home-page';
import { BasePage } from '../pages/base-page';
import { TradeSourceHomePage } from '../pages/tradesource-home-page';
import { SignInPage } from '../pages/sign-in-page';

// the types tell TypeScript what each fixture gives a test
type Fixtures = {
  searchResultsPage: SearchResultsPage;
  manufacturerHomePage: ManufacturerHomePage;
  basePage: BasePage;
  tradeSourceHomePage: TradeSourceHomePage;
  signInPage: SignInPage;
  // auto fixtures: they give the test nothing, they just watch for popups
  acceptCookies: void;
  closeDialog: void;
};

// specs import `test` and `expect` from this file instead of '@playwright/test'
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
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },

  // ==========================================================================
  // POPUP HANDLERS
  // auto fixtures, so they run for every test without being asked for
  // the popups appear after a random delay, so a handler dismisses them whenever they show up
  // ==========================================================================

  // accept the cookie banner whenever it appears
  acceptCookies: [
    async ({ page }, use) => {
      // register the handler: playwright checks for this button before every action and assertion
      await page.addLocatorHandler(
        page.getByRole('button', { name: 'Accept all' }),
        // if the button is visible, click it, then carry on with the test
        async (button) => {
          await button.click();
        },
      );
      // run the test, with the handler active for its whole duration
      await use();
    },
    // auto: true runs this for every test, even if the test doesn't ask for it
    { auto: true },
  ],

  // close the new feature popup whenever it appears (scoped to that dialog, as the sign-in required modal also has a close dialog button)
  closeDialog: [
    async ({ page }, use) => {
      // register the handler: watch for the new feature popup by its title
      await page.addLocatorHandler(
        page.getByRole('dialog', { name: 'Discover TradeSource Insights' }),
        // if the popup is visible, click its close button, then carry on with the test
        async (dialog) => {
          await dialog.getByRole('button', { name: 'Close dialog' }).click();
        },
      );
      // run the test, with the handler active for its whole duration
      await use();
    },
    // auto: true runs this for every test, even if the test doesn't ask for it
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
