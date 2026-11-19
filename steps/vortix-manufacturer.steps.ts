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

// check the telephone button visibility
Then('the telephone button should be visible', async ({ manufacturerHomePage }) => {
  await expect(manufacturerHomePage.telephoneButton).toBeVisible();
});

// check the telephone button number
Then('the telephone button should have the correct number', async ({ manufacturerHomePage }, number: string) => {
  await expect(manufacturerHomePage.telephoneButton).toHaveText(number);
});

// check the telephone button link
Then('the telephone button should have the correct link', async ({ manufacturerHomePage }, link: string) => {
  await expect(manufacturerHomePage.telephoneButton).toHaveAttribute('href', link);
});