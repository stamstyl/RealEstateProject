export class FeatureListingsPage {
  constructor(page) {
    this.page = page;
    this.switchtoDark = page.locator('[type="checkbox"]');
    this.listings = page.locator('[class*="MuiPaper-root MuiPaper-elevation MuiPaper-rounded"]');
    this.listingTitle = page.locator('h5[class*="MuiTypography-root"]');
    this.listingBedrooms = page.locator('[viewBox="0 0 2048 1280"]').locator("xpath=..");
    this.moreInfoButton = page.getByRole("link", { name: "More Info" });

    this.searchInputField = page.getByRole("textbox", { name: "Search" });
    this.searchByCity = page.getByRole("textbox", { name: "City" });
    this.searchBedroomsField = page.getByRole("button", { name: /Bedrooms/i });
    this.numberOfBedrooms = page.locator("ul.MuiList-root");
    this.startSearchButton = page.getByRole("button", { name: "Start Search" });

    this.moreInfoPrice = page.locator('[viewBox="0 0 1920 1280"]').locator("xpath=..");
    this.moreInfoLotSize = page.locator('[viewBox="0 0 1536 1536"]').locator("xpath=..");
    this.moreInfoGarage = page.locator('[viewBox="0 0 2048 1600"]').locator("xpath=..");
    this.moreInfoBathrooms = page.locator('[viewBox="0 0 1792 1792"]').locator("xpath=..");
    this.moreInfoSquareFeet = page.locator('[viewBox="0 0 1664 1408"]').locator("xpath=..");
    this.moreInfoListingDate = page.locator('[viewBox="0 0 1664 1792"]').locator("xpath=..");
    this.moreInfoBedrooms = page.locator('[viewBox="0 0 2048 1280"]').locator("xpath=..");
    this.moreInfoRealtor = page.locator('[viewBox="0 0 1280 1536"]').locator("xpath=..");
    this.moreInfoDescription = page.locator('[class*="MuiBox-root"] p:nth-child(1)');
  }

  async moreInfoPage() {
    await this.moreInfoButton.first().click();
  }

  async pickNumberOfBedrooms(bedNum) {
    await this.searchBedroomsField.click();
    await this.numberOfBedrooms.locator(`[data-value="${bedNum}"]`).click();
  }
}
