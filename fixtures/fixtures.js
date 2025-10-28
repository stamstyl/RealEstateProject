import { test as base, request } from "@playwright/test";
import { apiLogin } from "../api/usersApi";
import { apiCreateListings } from "../api/listingsApi";

export const test = base.extend({
  authenticatedPage: async ({ browser }, use, testInfo) => {
    const apiClient = await request.newContext();
    const token = await apiLogin(apiClient, testInfo.project.use.env.baseEmail, testInfo.project.use.env.basePassword);
    const context = await browser.newContext();

    await context.addInitScript(({ tokenValue }) => {
        window.localStorage.setItem("accessToken", tokenValue);
      }, { tokenValue: token });
   
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  createdListing: async ({}, use, testInfo) => {
    const apiClient = await request.newContext();
    const token = await apiLogin(apiClient, testInfo.project.use.env.baseEmail, testInfo.project.use.env.basePassword);
    const listing = await apiCreateListings(apiClient, token);

    await use(listing);
    await apiClient.dispose();
  },
});