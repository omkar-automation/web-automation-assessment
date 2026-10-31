const { test, expect } = require('../fixtures/testFixtures');
const { credentials, paths } = require('../config/constants');

test.describe('Part 1 — Functional coverage', () => {
  test('valid login → PIM navigation → logout', async ({ loginPage, dashboardPage, employeePage }) => {
    await loginPage.open();
    await loginPage.login(credentials.username, credentials.password);
    await dashboardPage.assertLoaded();
    await dashboardPage.openPIM();
    await employeePage.assertLoaded();
    await dashboardPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('invalid credentials show error and cannot reach protected employee page', async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.login('invalid_user', 'incorrect_password');
    await loginPage.assertInvalidCredentials();
    await page.goto(paths.employees);
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  
  test('employee list renders data grid and search controls', async ({ authenticatedPage, dashboardPage, employeePage }) => {
    await dashboardPage.openPIM();
    await employeePage.assertLoaded();
    await employeePage.assertResultsRendered();
    await expect(employeePage.employeeId).toBeVisible();
    await employeePage.assertEmployeeData();
});

});
