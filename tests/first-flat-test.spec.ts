// tests/first-flat-test.spec.ts
import { test, expect } from '@playwright/test';

// deliberately unoptimised: every test repeats the full navigation to the Vortix manufacturer page
test.describe('Vortix manufacturer page (unoptimised)', () => {
  // Test 00 - Navigate to the Vortix manufacturer page
  test('navigate to vortix manufacturer homepage', async ({ page }) => {
    await page.goto('/');
    const searchBox = page.getByRole('textbox', { name: 'Search products or manufacturers' });

    await expect(page).toHaveTitle('TradeSource');
    await page.getByRole('button', { name: 'Accept all' }).click();
    await page.getByRole('button', { name: 'Close dialog' }).click();
    await searchBox.fill('Vortix');
    await searchBox.press('Enter');
    await page.getByRole('tab', { name: 'Manufacturer' }).click();
    await page.getByRole('link', { name: 'Vortix Vortix Commercial cleaning equipment, built for daily use' }).click();
    await expect(page).toHaveURL(/manufacturer\/vortix\/vtxA1B2C3D4E5F6G7H8\/overview/);
  });

  // Test 01 - Assert h1 header is correct
  test('assert h1 header is correct', async ({ page }) => {
    await page.goto('/');
    const searchBox = page.getByRole('textbox', { name: 'Search products or manufacturers' });
    const header = page.getByRole('heading', { level: 1 });

    await expect(page).toHaveTitle('TradeSource');
    await page.getByRole('button', { name: 'Accept all' }).click();
    await page.getByRole('button', { name: 'Close dialog' }).click();
    await searchBox.fill('Vortix');
    await searchBox.press('Enter');
    await page.getByRole('tab', { name: 'Manufacturer' }).click();
    await page.getByRole('link', { name: 'Vortix Vortix Commercial cleaning equipment, built for daily use' }).click();
    await expect(page).toHaveURL(/manufacturer\/vortix\/vtxA1B2C3D4E5F6G7H8\/overview/);
    await expect(header).toHaveText('Vortix');
  });

  // Test 02 - Assert h1 header paragraph is correct
  test('assert h1 header paragraph is correct', async ({ page }) => {
    await page.goto('/');
    const searchBox = page.getByRole('textbox', { name: 'Search products or manufacturers' });
    const headerParagraph = page.getByTestId('manufacturer-tagline');

    await expect(page).toHaveTitle('TradeSource');
    await page.getByRole('button', { name: 'Accept all' }).click();
    await page.getByRole('button', { name: 'Close dialog' }).click();
    await searchBox.fill('Vortix');
    await searchBox.press('Enter');
    await page.getByRole('tab', { name: 'Manufacturer' }).click();
    await page.getByRole('link', { name: 'Vortix Vortix Commercial cleaning equipment, built for daily use' }).click();
    await expect(page).toHaveURL(/manufacturer\/vortix\/vtxA1B2C3D4E5F6G7H8\/overview/);
    await expect(headerParagraph).toHaveText('Commercial cleaning equipment, built for daily use');
  });

  // Test 03 - Assert the telephone button is correct
  test('assert the telephone button is correct', async ({ page }) => {
    await page.goto('/');
    const searchBox = page.getByRole('textbox', { name: 'Search products or manufacturers' });
    const telephoneButton = page.getByRole('link', { name: '08001234567' });

    await expect(page).toHaveTitle('TradeSource');
    await page.getByRole('button', { name: 'Accept all' }).click();
    await page.getByRole('button', { name: 'Close dialog' }).click();
    await searchBox.fill('Vortix');
    await searchBox.press('Enter');
    await page.getByRole('tab', { name: 'Manufacturer' }).click();
    await page.getByRole('link', { name: 'Vortix Vortix Commercial cleaning equipment, built for daily use' }).click();
    await expect(page).toHaveURL(/manufacturer\/vortix\/vtxA1B2C3D4E5F6G7H8\/overview/);
    await expect(telephoneButton).toBeVisible();
    await expect(telephoneButton).toHaveText('08001234567');
    await expect(telephoneButton).toHaveAttribute('href', 'tel:08001234567');
  });

  // Test 04 - Assert the website link button is correct
  test('assert the website link button is correct', async ({ page }) => {
    await page.goto('/');
    const searchBox = page.getByRole('textbox', { name: 'Search products or manufacturers' });
    const websiteLinkButton = page.getByRole('link', { name: 'Website' });

    await expect(page).toHaveTitle('TradeSource');
    await page.getByRole('button', { name: 'Accept all' }).click();
    await page.getByRole('button', { name: 'Close dialog' }).click();
    await searchBox.fill('Vortix');
    await searchBox.press('Enter');
    await page.getByRole('tab', { name: 'Manufacturer' }).click();
    await page.getByRole('link', { name: 'Vortix Vortix Commercial cleaning equipment, built for daily use' }).click();
    await expect(page).toHaveURL(/manufacturer\/vortix\/vtxA1B2C3D4E5F6G7H8\/overview/);
    await expect(websiteLinkButton).toBeVisible();
    await expect(websiteLinkButton).toHaveText('Website');
    await expect(websiteLinkButton).toHaveAttribute('href', 'https://www.vortix-commercial.example/overview');
  });

  // Test 05 - Assert the contact manufacturer button is correct
  test('assert the contact manufacturer button is correct', async ({ page }) => {
    await page.goto('/');
    const searchBox = page.getByRole('textbox', { name: 'Search products or manufacturers' });
    const contactManufacturerButton = page.getByRole('button', { name: 'Contact manufacturer' });

    await expect(page).toHaveTitle('TradeSource');
    await page.getByRole('button', { name: 'Accept all' }).click();
    await page.getByRole('button', { name: 'Close dialog' }).click();
    await searchBox.fill('Vortix');
    await searchBox.press('Enter');
    await page.getByRole('tab', { name: 'Manufacturer' }).click();
    await page.getByRole('link', { name: 'Vortix Vortix Commercial cleaning equipment, built for daily use' }).click();
    await expect(page).toHaveURL(/manufacturer\/vortix\/vtxA1B2C3D4E5F6G7H8\/overview/);
    await expect(contactManufacturerButton).toBeVisible();
    await expect(contactManufacturerButton).toHaveText('Contact manufacturer');
  });
});
