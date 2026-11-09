// tests/auth.setup.ts
import fs from 'fs';
import { test as setup, expect } from '../fixtures/test-options';
import { BasePage } from '../pages/base-page';

// the saved sign-in session, loaded by the browser projects in playwright.config.ts
export const authFile = 'playwright/.auth/user.json';

// runs once before the browser projects: reuse the saved session if it still works, otherwise sign in and save a new one
setup('authenticate', async ({ browser, page, basePage, signInPage }) => {
  // if a saved session exists, check it still signs the user in
  if (fs.existsSync(authFile)) {
    const savedContext = await browser.newContext({ storageState: authFile });
    const savedPage = new BasePage(await savedContext.newPage());
    await savedPage.navigateToHomepage();
    const stillSignedIn = await savedPage.openUsermenu
      .waitFor({ state: 'visible', timeout: 5000 })
      .then(() => true)
      .catch(() => false);
    await savedContext.close();
    if (stillSignedIn) {
      return;
    }
  }

  // no saved session, or it has expired: sign in through the ui and save the new session
  await basePage.navigateToHomepage();
  await basePage.clickSignIn();
  await signInPage.signIn();
  await expect(basePage.openUsermenu).toBeVisible();
  await page.context().storageState({ path: authFile });
});
