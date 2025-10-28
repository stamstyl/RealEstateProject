import { test, expect } from "@playwright/test";
import { HomePage } from "../../page_objects/home.page";
import { RegistrationPage } from "../../page_objects/registration.page";
import { DashboardPage } from "../../page_objects/dashboard.page";
import { LoginPage } from "../../page_objects/login.page";
import { faker } from '@faker-js/faker';

let registrationPage, dashboardPage, homePage, loginPage;

const nameRandom = faker.person.firstName();
const lastNameRandom = faker.person.lastName();
const emailRandom = faker.internet.email({ firstName: nameRandom, lastName: lastNameRandom });
const passwordRandom = faker.internet.password();

test.beforeEach( async ({ page }, testInfo) => {
  registrationPage = new RegistrationPage(page);
  dashboardPage = new DashboardPage(page);
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  
  await page.goto(testInfo.project.use.env.baseUrl);
});

test("Should register a new account", async () => {
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

test("Should not register without filling in the required fields", async () => {
  await homePage.buttonRegister.click();
  await registrationPage.registerButton.click();

  await expect(registrationPage.firstNameError).toHaveText("First name required");
  await expect(registrationPage.lastNameError).toHaveText("Last name required");
  await expect(registrationPage.emailError).toHaveText("Email is required");
  await expect(registrationPage.passwordError).toHaveText("Password is required");
});
