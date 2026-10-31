const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { EmployeePage } = require('../pages/EmployeePage');
const { credentials } = require('../config/constants');

const test = base.test.extend({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  dashboardPage: async ({ page }, use) => { await use(new DashboardPage(page)); },
  employeePage: async ({ page }, use) => { await use(new EmployeePage(page)); },
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.open();
    await loginPage.login(credentials.username, credentials.password);
    await dashboardPage.assertLoaded();
    await use(page);
  },
});
module.exports = { test, expect: base.expect };
