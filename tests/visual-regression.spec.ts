// tests/visual-regression.spec.ts
import { test, expect } from '../fixtures/test-options';

// full-page screenshots compared against a saved baseline image
// baselines live in tests/visual-baselines/<os>/<browser>/ and are created automatically when missing
test.describe('visual regression', () => {
  // Test 01 - The Vortix manufacturer homepage matches its baseline
  test('the Vortix manufacturer homepage matches its baseline', async ({ page, manufacturerHomePage }) => {
    // the popups appear at a random moment, so switch them off before the page loads
    await manufacturerHomePage.disablePopups();
    await manufacturerHomePage.navigateToVortixOverview();
    await expect(manufacturerHomePage.h1Header).toHaveText('Vortix');
    await manufacturerHomePage.loadLazyImages();

    await expect(page).toHaveScreenshot('vortix-overview.png', { fullPage: true });
  });
});
