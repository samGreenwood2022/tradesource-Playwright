// steps/vortix-manufacturer.steps.ts
import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/test-options';

const { Given, Then } = createBdd(test);

// navigate to the vortix manufacturer page through search
Given('I am on the Vortix manufacturer page', async ({ page, basePage, tradeSourceHomePage, searchResultsPage }) => {
  await basePage.navigateToHomepage();
  await tradeSourceHomePage.searchFor('Vortix');
  await searchResultsPage.clickManufacturerTab();
  await searchResultsPage.clickTile();
  await expect(page).toHaveURL(/manufacturer\/vortix\/vtxA1B2C3D4E5F6G7H8\/overview/);
});

// check the h1 header text
Then('the h1 header should be {string}', async ({ manufacturerHomePage }, text: string) => {
  await expect(manufacturerHomePage.h1Header).toHaveText(text);
});

// check the tagline text
Then('the tagline should be {string}', async ({ manufacturerHomePage }, text: string) => {
  await expect(manufacturerHomePage.h1HeaderParagraph).toHaveText(text);
});