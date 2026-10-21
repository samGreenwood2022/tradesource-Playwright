import { test, expect } from '@playwright/test';

test('navigate to vortix manufacturer homepage', async ({ page }) => {
  await page.goto('http://localhost:4321');
  const searchBox = page.getByRole('textbox', { name: 'Search products or manufacturers' });
  const title = await page.title();

  expect(title).toBe('TradeSource');
  await searchBox.fill('Vortix');
  await searchBox.press('Enter');

  await page.getByRole('tab', { name: 'Manufacturer' }).click();
  await page.getByRole('link', { name: 'Vortix Vortix Commercial cleaning equipment, built for daily use' }).click();
  expect(page.url()).toContain('manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');
});