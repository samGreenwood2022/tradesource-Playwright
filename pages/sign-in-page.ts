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
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailField = page.getByTestId('email-input').filter({ visible: true });
    this.passwordField = page.getByTestId('password-input').filter({ visible: true });
    this.signInButton = page.getByTestId('sign-in-button').filter({ visible: true });
  }

  // ==========================================================================
  // METHODS
  // reusable actions, using the locators above
  // assertions belong in the spec files
  // ==========================================================================

  async signIn(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }
}
