
const { expect } = require('@playwright/test');
const { paths, messages } = require('../config/constants');

class EmployeePage {
  constructor(page) {
    this.page = page;

    this.heading = page.getByRole('heading', {
      name: 'Employee Information'
    });

    this.searchButton = page.getByRole('button', {
      name: 'Search',
      exact: true
    });

    this.resetButton = page.getByRole('button', {
      name: 'Reset',
      exact: true
    });

    this.employeeId = page.locator('.oxd-input-group')
      .filter({ has: page.getByText('Employee Id', { exact: true }) })
      .locator('input');

    this.employeeName = page.locator('.oxd-input-group')
      .filter({ has: page.getByText('Employee Name', { exact: true }) })
      .locator('input');

    this.table = page.locator('.oxd-table');

    this.rows = page.locator('.oxd-table-body .oxd-table-row');

   this.noRecords = page.locator('.orangehrm-horizontal-padding')
  .getByText(messages.noRecords, { exact: true });
  }

  async assertNoEmployeeRows() {
    await expect(this.noRecords).toBeVisible();
    await expect(this.rows).toHaveCount(0);
  }

  async open() {
    await this.page.goto(paths.employees);
    await this.assertLoaded();
  }

  async assertLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.table).toBeVisible();
  }

  async searchById(id) {
    await this.employeeId.fill(id);
    await this.searchButton.click();
  }

  async searchByName(name) {
    await this.employeeName.fill(name);
    await this.searchButton.click();
  }

  async assertResultsRendered() {
    await expect(this.table).toBeVisible();
    await expect(this.page.locator('.oxd-table-header')).toBeVisible();

    await expect.poll(async () => {
      const rowCount = await this.rows.count();
      return rowCount > 0 || await this.noRecords.isVisible();
    }).toBeTruthy();

    if (await this.rows.count() > 0) {
      await expect(this.rows.first().locator('.oxd-table-cell').first()).toBeVisible();
    }
  }

  async resetSearch() {
    await this.resetButton.click();
    await expect(this.employeeId).toHaveValue('');
  }

  async assertEmployeeData() {
    await expect(this.rows.first()).toBeVisible();

    const firstRow = this.rows.first();
    const cells = firstRow.locator('.oxd-table-cell');

    await expect(cells.nth(1)).toContainText(/\S/);
    await expect(cells.nth(2)).toContainText(/\S/);
    await expect(cells.nth(3)).toContainText(/\S/);
  }
}

module.exports = { EmployeePage };
