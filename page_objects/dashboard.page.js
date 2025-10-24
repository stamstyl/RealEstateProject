export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.fullUsersNameInput = page.locator('h6[class*="MuiTypography-root"]');
    this.roleName = page.locator('p[class*="MuiTypography-root MuiTypography-body2 M"]');
    this.profileButton = page.locator('button [class*="MuiAvatar-r"]');
    this.profileLogoutButton = page.locator('[class*="p9n58v"]');
  }
}
