import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

// SignInPage is the page object for the sign-in page
export class SignInPage extends BasePage {
  // ==========================================================================
  // LOCATORS
  // declared here as readonly properties, created from the page in the constructor
  // ==========================================================================
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly logInButton: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailField = page.getByRole('textbox', { name: 'Email' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.logInButton = page.getByRole('button', { name: 'Sign in' });

  }

  // ==========================================================================
  // METHODS
  // reusable actions, using the locators above
  // assertions belong in the spec files
  // ==========================================================================

  // sign in with the credentials from .env, failing early if they are missing
  async signIn() {
    const { EMAIL, PASSWORD } = process.env;
    if (!EMAIL || !PASSWORD) {
      throw new Error('EMAIL and PASSWORD must be set in .env');
    }
    await this.emailField.fill(EMAIL);
    await this.nextButton.click();
    await this.passwordField.fill(PASSWORD);
    await this.logInButton.click();
  }
}
