export class HomePage {
  constructor(page) {
    this.page = page;
    this.switchtoDark = page.locator('[class*="PrivateSwitchBase-input"]');
    this.buttonLogin = page.locator('[href="/auth/login"]');
    this.buttonRegister = page.locator('[href="/auth/register"]');

    this.searchInputField = page.getByRole("textbox", {name: "Search"});
    this.searchByCity = page.getByRole("textbox", {name: "City"});    
    this.searchBedroomsField = page.getByRole("button", { name: /Bedrooms/i });
    this.numberOfBedrooms = page.locator('ul.MuiList-root');
    this.startSearchButton = page.getByRole('button', { name: 'Start Search' });
    
    this.searchStateMenuList = page.locator('[class*="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-true"] [class*="MuiSelect-select"]');
  }

   async pickNumberOfBedrooms(bedNum) {
    await this.searchBedroomsField.click();
    await this.numberOfBedrooms.locator(`[data-value="${bedNum}"]`).click();
  }
}
