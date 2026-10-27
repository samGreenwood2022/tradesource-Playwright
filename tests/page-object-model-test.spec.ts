// tests/page-object-model-test.spec.ts
import { test, expect } from '../fixtures/test-options';

// same checks as the optimised flat spec, now using page objects via fixtures
// locators and actions live in the pages/ folder, assertions stay here
test.describe('Vortix manufacturer page (page object model)', () => {
  // shared setup: navigate to the Vortix manufacturer page
  test.beforeEach('navigate to vortix manufacturer homepage', async ({ page, basePage, searchResultsPage, tradeSourceHomePage }) => {
    await basePage.navigateToHomepage();
    await basePage.acceptCookies();
    await basePage.closeDialog();
    await tradeSourceHomePage.searchFor('Vortix');
    await searchResultsPage.clickManufacturerTab();
    await searchResultsPage.clickTile();
    await expect(page).toHaveURL(/manufacturer\/vortix\/vtxA1B2C3D4E5F6G7H8\/overview/);
  });

  // Test 01 - Assert h1 header is correct
  test('assert h1 header is correct', async ({ manufacturerHomePage }) => {
    await expect(manufacturerHomePage.h1Header).toHaveText('Vortix');
  });

  // Test 02 - Assert h1 header paragraph is correct
  test('assert h1 header paragraph is correct', async ({ manufacturerHomePage }) => {
    await expect(manufacturerHomePage.h1HeaderParagraph).toHaveText('Commercial cleaning equipment, built for daily use');
  });

  // Test 03 - Assert the telephone button is correct
  test('assert the telephone button is correct', async ({ manufacturerHomePage }) => {
    await expect(manufacturerHomePage.telephoneButton).toBeVisible();
    await expect(manufacturerHomePage.telephoneButton).toHaveText('08001234567');
    await expect(manufacturerHomePage.telephoneButton).toHaveAttribute('href', 'tel:08001234567');
  });

  // Test 04 - Assert the website link button is correct
  test('assert the website link button is correct', async ({ manufacturerHomePage }) => {
    await expect(manufacturerHomePage.companyWebsiteLink).toBeVisible();
    await expect(manufacturerHomePage.companyWebsiteLink).toHaveText('Website');
    await expect(manufacturerHomePage.companyWebsiteLink).toHaveAttribute('href', 'https://www.vortix-commercial.example/overview');
    await expect(manufacturerHomePage.companyWebsiteLink).toHaveAttribute('target', '_blank');
  });

  // Test 05 - Assert the contact manufacturer button is correct
  test('assert the contact manufacturer button is correct', async ({ manufacturerHomePage }) => {
    await expect(manufacturerHomePage.contactManufacturerButton).toBeVisible();
    await expect(manufacturerHomePage.contactManufacturerButton).toHaveText('Contact manufacturer');
    await manufacturerHomePage.clickContactManufacturer();
    await expect(manufacturerHomePage.signInRequiredModal).toBeVisible();
  });

  // Test 06 - Assert the sign-in process works as expected
  test('assert the sign-in process works as expected', async ({ basePage, signInPage, page }) => {
   const currentURLBeforeSignIn = page.url();
   await basePage.clickSignIn();
   await signInPage.signIn();
   await expect(page).toHaveURL(currentURLBeforeSignIn);
   await expect(basePage.openUsermenu).toBeVisible();
  });

});
