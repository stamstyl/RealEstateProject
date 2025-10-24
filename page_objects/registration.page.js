export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[name="firstName"]');
    this.lastName = page.locator('[name="lastName"]');
    this.email = page.locator('[name="email"]');
    this.password = page.locator('[name="password"]');
    this.firstNameError = page.locator('[id=":r5:-helper-text"]');
    this.lastNameError = page.locator('[id=":r6:-helper-text"]');
    this.emailError = page.locator('[id=":r7:-helper-text"]');
    this.passwordError = page.locator('[id=":r8:-helper-text"]');
    this.registerButton = page.locator('[type="submit"]');
    this.dataInputError = page.locator('[role="alert"]');
  }
  async registration(name, lastName, password, email = "admin@gmail.com") {
    await this.firstName.fill(name);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.registerButton.click();
  }
}
