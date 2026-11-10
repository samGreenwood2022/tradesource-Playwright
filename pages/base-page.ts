// pages/base-page.ts
import { Page, Locator } from '@playwright/test';

// BasePage holds the locators and methods shared by every page in the app
// other page objects should extend this class, e.g. `class HomePage extends BasePage`
export class BasePage {
  readonly page: Page;

  // ==========================================================================
  // LOCATORS
  // declared here as readonly properties, created from the page in the constructor
  // ==========================================================================
  readonly signInButton: Locator;
  readonly openUsermenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.openUsermenu = page.getByRole('button', { name: 'Open user menu' });
  }

  // ==========================================================================
  // METHODS
  // reusable actions, using the locators above
  // assertions belong in the spec files
  // ==========================================================================

  // navigate to the TradeSource homepage
  async navigateToHomepage() {
    await this.page.goto('/');
  }

  // click the sign-in button
  async clickSignIn() {
    await this.signInButton.click();
  }

  // click the open user menu button
  async clickOpenUsermenu() {
    await this.openUsermenu.click();
  }

  // stop the cookie banner and new feature popup from appearing, using the site's own off switch
  // call before navigating: sets the tradesource_overlays=off cookie before the site's scripts run
  async disablePopups() {
    await this.page.addInitScript(() => {
      try {
        document.cookie = 'tradesource_overlays=off; path=/';
      } catch {
        // pages without a real origin (e.g. about:blank) can't hold cookies, ignore them
      }
    });
  }

  // scroll down one screen at a time so lazy-loaded images load, back to the top, then wait for every image
  async loadLazyImages() {
    await this.page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y);
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      window.scrollTo(0, 0);
    });
    await this.page.waitForFunction(() => Array.from(document.images).every((img) => img.complete));
  }
}
