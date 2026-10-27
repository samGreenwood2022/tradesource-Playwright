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
  readonly cookieAcceptButton: Locator;
  readonly closeDialogButton: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookieAcceptButton = page.getByRole('button', { name: 'Accept all' });
    this.closeDialogButton = page.getByRole('button', { name: 'Close dialog' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
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

  // accept the cookie banner (replaced by the acceptCookies fixture in Session 6)
  async acceptCookies() {
    await this.cookieAcceptButton.click();
  }

  // close the dialog if it appears
  async closeDialog() {
    await this.closeDialogButton.click();
  }

  // click the sign-in button
  async clickSignIn() {
    await this.signInButton.click();
  }
}
