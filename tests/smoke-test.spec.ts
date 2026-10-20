import { test, expect } from '@playwright/test';

test('navigate to vortix manufacturer homepage', async ({ page }) => {
  await page.goto('http://localhost:4321');
  const title = await page.title();
  expect(title).toBe('Vortix | Overview | TradeSource');
});