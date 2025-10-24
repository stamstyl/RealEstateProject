import { test, expect } from "@playwright/test";
import { HomePage } from "../../page_objects/home.page";
import { RegistrationPage } from "../../page_objects/registration.page";
import { DashboardPage } from "../../page_objects/dashboard.page";
import { LoginPage } from "../../page_objects/login.page";

const nameRandom = (Math.random() + 1).toString(36).substring(3);
const lastNameRandom = (Math.random() + 1).toString(36).substring(3);
const emailRandom = `${nameRandom}${lastNameRandom}@gmail.com`;
const passwordRandom = (Math.random() + 1).toString(36).substring(3);

let registrationPage;
let dashboardPage;
let homePage;
let loginPage;

test.beforeEach( async ({ page }) => {
  registrationPage = new RegistrationPage(page);
  dashboardPage = new DashboardPage(page);
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  
  await page.goto("/");
});

test("Should register a new account", async ({ page }) => {
  await homePage.buttonRegister.click();
  await registrationPage.registration(nameRandom,lastNameRandom, passwordRandom, emailRandom);

  await expect(dashboardPage.fullUsersNameInput).toHaveText(`${nameRandom} ${lastNameRandom}`);
  await expect(dashboardPage.roleName).toHaveText("role: user");
});

test("Should not register with an already existing email account", async ({ page }) => {
  await homePage.buttonRegister.click();
  await loginPage.existingEmail();
  await registrationPage.registration(nameRandom, lastNameRandom, passwordRandom);

  await expect(registrationPage.dataInputError).toHaveText("Input data validation failed");
  await expect(page).toHaveURL("/auth/register");
});

test("Should not register without filling in the required fields", async ({ page }) => {
  await homePage.buttonRegister.click();
  await registrationPage.registerButton.click();

  await expect(registrationPage.firstNameError).toHaveText("First name required");
  await expect(registrationPage.lastNameError).toHaveText("Last name required");
  await expect(registrationPage.emailError).toHaveText("Email is required");
  await expect(registrationPage.passwordError).toHaveText("Password is required");
});
