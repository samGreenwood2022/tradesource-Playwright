// tests/page-object-model-test.spec.ts
import { test, expect } from '../fixtures/test-options';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';

// same checks as the optimised flat spec, now using page objects via fixtures
// locators and actions live in the pages/ folder, assertions stay here
test.describe('Vortix manufacturer page (page object model)', () => {
  // shared setup for both groups: navigate to the Vortix manufacturer page (popups are handled by the fixtures)
  test.beforeEach(
    'navigate to vortix manufacturer homepage',
    async ({ page, basePage, searchResultsPage, tradeSourceHomePage }) => {
      await basePage.navigateToHomepage();
      await tradeSourceHomePage.searchFor('Vortix');
      await searchResultsPage.clickManufacturerTab();
      await searchResultsPage.clickTile();
      await expect(page).toHaveURL(/manufacturer\/vortix\/vtxA1B2C3D4E5F6G7H8\/overview/);
    },
  );

  // these tests start signed in, using the session saved by tests/auth.setup.ts
  test.describe('signed in', () => {
    // Test 01 - Assert h1 header is correct
    test('assert h1 header is correct', async ({ manufacturerHomePage }) => {
      await expect(manufacturerHomePage.h1Header).toHaveText('Vortix');
    });

    // Test 02 - Assert h1 header paragraph is correct
    test('assert h1 header paragraph is correct', async ({ manufacturerHomePage }) => {
      await expect(manufacturerHomePage.h1HeaderParagraph).toHaveText(
        'Commercial cleaning equipment, built for daily use',
      );
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
      await expect(manufacturerHomePage.companyWebsiteLink).toHaveAttribute(
        'href',
        'https://www.vortix-commercial.example/overview',
      );
      await expect(manufacturerHomePage.companyWebsiteLink).toHaveAttribute('target', '_blank');
    });
  });

  // these tests need the user signed out, so they start with an empty session
  test.describe('signed out', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

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

    // Test 07 - Scan the Vortix page for accessibility violations and report them
    // violations are expected on this training site, so they are reported rather than failing the test
    test('scan the Vortix page for accessibility violations', async ({ page }, testInfo) => {
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(results, null, 2),
        contentType: 'application/json',
      });

      // readable html version of the scan, saved to accessibility-report/ and attached to the playwright report
      const htmlReport = createHtmlReport({
        results,
        options: {
          projectKey: 'Vortix manufacturer page',
          outputDir: 'accessibility-report',
          reportFileName: `vortix-${testInfo.project.name}.html`,
        },
      });
      await testInfo.attach('accessibility-report', { body: htmlReport, contentType: 'text/html' });

      // list each violation as an annotation so it shows on the test in the playwright report
      for (const violation of results.violations) {
        testInfo.annotations.push({
          type: `accessibility violation (${violation.impact})`,
          description: `${violation.id}: ${violation.help} (${violation.nodes.length} element(s))`,
        });
      }

      // check the scan actually ran against the page
      expect(results.passes.length).toBeGreaterThan(0);
    });
  });
});
