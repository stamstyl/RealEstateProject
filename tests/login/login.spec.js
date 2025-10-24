import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page_objects/login.page";
import { HomePage } from "../../page_objects/home.page";
import { DashboardPage } from "../../page_objects/dashboard.page";
import { apiLogin } from "../../api/usersApi";
import users from "../../data/users.json";

let dashboardPage, loginPage, homePage;

test.beforeEach(async ({ page }) => {
  dashboardPage = new DashboardPage(page);
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
});

test("Should log in with your existing account as an admin", async ({ page }) => {
  await page.goto("/");

  await homePage.buttonLogin.click();
  await loginPage.login(users.user.email, users.user.password);

  await expect(dashboardPage.fullUsersNameInput).toHaveText("stel stam");
  await expect(dashboardPage.roleName).toHaveText("role: realtor");
});

test("Should log out", async ({ page, request }) => {
  const token = await apiLogin(request, users.user.email, users.user.password);

  await page.goto("/");
  await page.evaluate((token) => localStorage.setItem('accessToken', token), token);
  await page.goto("/dashboard/user/profile");
  await dashboardPage.profileButton.click();
  await dashboardPage.profileLogoutButton.click();

  await expect(page).toHaveURL("auth/login");
});
