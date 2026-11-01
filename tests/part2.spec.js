const { test, expect } = require('../fixtures/testFixtures');
const { nonexistentEmployeeId, nonexistentEmployeeName } = require('../test-data/employeeData'); 

test('edge EC-01: nonexistent employee ID search', async ({ 
  authenticatedPage, employeePage}) => {
  await employeePage.open();
  await employeePage.searchById(nonexistentEmployeeId);
  await employeePage.assertNoEmployeeRows();
});


test('edge EC-02: nonexistent employee name search', async ({
  authenticatedPage, employeePage }) => {
  await employeePage.open();
  await employeePage.searchByName(nonexistentEmployeeName);
  await employeePage.assertNoEmployeeRows();
});

  test('network failure: failed employee API keeps search UI usable, recovery works', async ({ authenticatedPage, page, employeePage }) => {
    await employeePage.open();
    let intercepted = 0;
    const pattern = '**/api/v2/pim/employees?*';
    const handler = async (route) => {
      intercepted++;
      await route.abort('failed');
    };
    await page.route(pattern, handler);
    try {
      await employeePage.searchById(nonexistentEmployeeId);
      await expect.poll(() => intercepted).toBeGreaterThan(0);
      await expect(employeePage.heading).toBeVisible();
      await expect(employeePage.searchButton).toBeEnabled();
    } finally {
      await page.unroute(pattern, handler);
    }
    await employeePage.resetSearch();
    await employeePage.assertResultsRendered();
    await test.info().attach('network-interception', {
      body: Buffer.from(`Employee requests aborted during test: ${intercepted}\nRecovered after removing route.`),
      contentType: 'text/plain',
    });
  });