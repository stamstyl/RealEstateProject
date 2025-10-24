import { test } from "../../fixtures/fixtures";
import { expect } from "@playwright/test";
import { HomePage } from "../../page_objects/home.page";
import { FeatureListingsPage } from "../../page_objects/featurelistings.page";

let homePage, featureListingsPage, sharedListing;

test.describe.configure({ mode: "default" });

test.describe("Searching with the same Listing", () => {
  test.beforeAll(async ({ createdListing }) => {
    sharedListing = createdListing;
  });

  test.beforeEach(async ({ authenticatedPage }) => {
    homePage = new HomePage(authenticatedPage);
    featureListingsPage = new FeatureListingsPage(authenticatedPage);

    await authenticatedPage.goto("/");
    await featureListingsPage.switchtoDark.check();
  });

  test("Should search by keyword", async () => {
    await homePage.searchInputField.fill(sharedListing.title);
    await homePage.startSearchButton.click();
    await expect(featureListingsPage.listings).toBeVisible();
    await expect(featureListingsPage.listingTitle).toContainText(sharedListing.title);
  });

  test("Should search by bedrooms", async () => {
    await homePage.pickNumberOfBedrooms(sharedListing.bedrooms);
    await homePage.startSearchButton.click();
    await featureListingsPage.moreInfoPage();

    const bedroomsText = await featureListingsPage.moreInfoBedrooms.textContent();
    const bedroomsTextDigit = await bedroomsText.slice(11, 12);
    const receivedNum = parseInt(bedroomsTextDigit, 10);
    const expectedNum = parseInt(sharedListing.bedrooms, 10);

    expect(receivedNum).toBeGreaterThanOrEqual(expectedNum);
  });

  test("Should search by city", async () => {
    await homePage.searchByCity.fill(sharedListing.city);
    await homePage.startSearchButton.click();

    await expect(featureListingsPage.listingTitle).toHaveCount(1);

    await featureListingsPage.moreInfoPage();

    const formattedPrice = Number(sharedListing.price).toLocaleString("en-US");

    const isoDate = sharedListing.createdAt;
    const date = new Date(isoDate);
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    await expect(featureListingsPage.moreInfoPrice).toContainText(formattedPrice);
    await expect(featureListingsPage.moreInfoLotSize).toContainText(sharedListing.lotSize);
    await expect(featureListingsPage.moreInfoGarage).toContainText(sharedListing.garage);
    await expect(featureListingsPage.moreInfoBathrooms).toContainText(sharedListing.bathrooms);
    await expect(featureListingsPage.moreInfoSquareFeet).toContainText(sharedListing.sqft);
    await expect(featureListingsPage.moreInfoListingDate).toContainText(formatter.format(date));
    await expect(featureListingsPage.moreInfoBedrooms).toContainText(sharedListing.bedrooms);
    await expect(featureListingsPage.moreInfoRealtor).toContainText("Yurii Shmidt");
    await expect(featureListingsPage.moreInfoDescription).toContainText(sharedListing.description);
  });

  test("Should search by price", async ({ authenticatedPage }) => {
    const lowPrice = sharedListing.price - 100000;
    const highPrice = +sharedListing.price + 100000;
    const lowPriceDigit = parseInt(lowPrice, 10);
    const highPriceDigit = parseInt(highPrice, 10);

    await authenticatedPage.goto(`/featured-listings?price=${lowPrice}-${highPrice}`);
    await featureListingsPage.moreInfoPage();

    const text = await featureListingsPage.moreInfoPrice.textContent();
    const clean = text.replace(/\D/g, "");
    const price = clean ? parseInt(clean, 10) : 0;

    expect(price).toBeGreaterThanOrEqual(lowPriceDigit);
    expect(price).toBeLessThanOrEqual(highPriceDigit);
  });
});
