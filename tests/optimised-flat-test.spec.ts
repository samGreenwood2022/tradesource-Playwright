import { test, expect } from '@playwright/test';

// beforeEach - navigate to vortix manufacturer homepage before each test
test.beforeEach('navigate to vortix manufacturer homepage', async ({ page }) => {
  await page.goto('http://localhost:4321');
  const searchBox = page.getByRole('textbox', { name: 'Search products or manufacturers' });
  const title = await page.title();

  await page.getByRole('button', { name: 'Accept all' }).click();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  expect(title).toBe('TradeSource');
  await searchBox.fill('Vortix');
  await searchBox.press('Enter');
  await page.getByRole('tab', { name: 'Manufacturer' }).click();
  await page.getByRole('link', { name: 'Vortix Vortix Commercial cleaning equipment, built for daily use' }).click();
  expect(page.url()).toContain('manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');
});

// test 01 - assert the h1 header is correct
test('assert h1 header is correct', async ({ page }) => {
  const header = page.getByRole('heading', { level: 1 });

  await expect(header).toHaveText('Vortix');
});

// test 02 - assert the h1 header paragraph is correct
test('assert h1 header paragraph is correct', async ({ page }) => {
  const headerParagraph = page.getByTestId('manufacturer-tagline');

  await expect(headerParagraph).toHaveText('Commercial cleaning equipment, built for daily use');
});

// test 03 - assert the telephone button is correct
test('assert the telephone button is correct', async ({ page }) => {
  const telephoneButton = page.getByRole('link', { name: '08001234567' });

  await expect(telephoneButton).toBeVisible();
  await expect(telephoneButton).toHaveText('08001234567');
  await expect(telephoneButton).toHaveAttribute('href', 'tel:08001234567');
});

// test 04 - assert the website link button is correct
test('assert the website link button is correct', async ({ page }) => {
  const websiteLinkButton = page.getByRole('link', { name: 'Website' });

  await expect(websiteLinkButton).toBeVisible();
  await expect(websiteLinkButton).toHaveText('Website');
  await expect(websiteLinkButton).toHaveAttribute('href', 'https://www.vortix-commercial.example/overview');
});

// test 05 - assert the contact manufacturer link button is correct
test('assert the contact manufacturer link button is correct', async ({ page }) => {
  const contactmanufacturerButton = page.getByRole('button', { name: 'Contact manufacturer' });

  await expect(contactmanufacturerButton).toBeVisible();
  await expect(contactmanufacturerButton).toHaveText('Contact manufacturer');
  
});