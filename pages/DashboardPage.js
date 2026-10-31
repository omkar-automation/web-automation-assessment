const { expect } = require('@playwright/test');
const { paths } = require('../config/constants');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.pimLink = page.getByRole('link', { name: 'PIM', exact: true });
    this.userDropdown = page.locator('.oxd-userdropdown-tab'); // No unique accessible label in demo UI.
    this.logoutItem = page.getByRole('menuitem', { name: 'Logout' });
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/\/dashboard\/index/);
    await expect(this.dashboardHeading).toBeVisible();
  }

  async openPIM() {
    await this.pimLink.click();
    await expect(this.page).toHaveURL(/\/pim\/viewEmployeeList/);
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutItem.click();
    await expect(this.page).toHaveURL(/\/auth\/login/);
  }
}
module.exports = { DashboardPage };
