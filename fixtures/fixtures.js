import { test as base, request } from "@playwright/test";
import { apiLogin } from "../api/usersApi";
import { apiCreateListings } from "../api/listingsApi";

export const test = base.extend({
  authenticatedPage: async ({ browser }, use, testInfo) => {
    const { baseUrl, baseUserApi, baseEmail, basePassword } = testInfo.project.use.env;

    const apiClient = await request.newContext();
    const token = await apiLogin(apiClient, baseUrl, baseUserApi, baseEmail, basePassword);
    const context = await browser.newContext();

    await context.addInitScript(({ tokenValue }) => {
        window.localStorage.setItem("accessToken", tokenValue);
      }, { tokenValue: token });
   
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  createdListing: async ({}, use, testInfo) => {
    const { baseUrl, baseUserApi, baseEmail, basePassword, baseListingApi } = testInfo.project.use.env;

    const apiClient = await request.newContext();
    const token = await apiLogin(apiClient, baseUrl, baseUserApi, baseEmail, basePassword);
    const listing = await apiCreateListings(apiClient, token, baseUrl, baseListingApi);

    await use(listing);
    await apiClient.dispose();
  },
});