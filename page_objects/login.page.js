export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.loginButton = page.locator('[type="submit"]');
  }

  async login(email = "admin@gmail.com", password = "DontTestMe") {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async existingEmail(email = "admin@gmail.com") {
    await this.emailInput.fill(email);
  }
}
