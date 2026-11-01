# OrangeHRM Automation Testing

This project contains Playwright automation tests for the OrangeHRM demo website using JavaScript.

Website: https://opensource-demo.orangehrmlive.com

## Tools Used
- Playwright
- JavaScript
- Node.js
- Chromium

## Project Structure
- `pages/` - Page objects and locators
- `tests/` - Test cases
- `fixtures/` - Common test setup
- `config/` - Environment settings
- `test-data/` - Test data
- `playwright.config.ts` - Playwright configuration

## Setup

Install dependencies and browser:

```bash
npm install
npx playwright install chromium
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run tests with browser:

```bash
npx playwright test --headed
```

View report:

```bash
npx playwright show-report
```

## Test Scenarios

**Part 1 - Functional Testing**
1. Valid login, PIM navigation and logout
2. Invalid login and error message verification
3. Employee list and search page verification


## Part 2 - Edge Cases

| ID | Scenario | Expected Result | Status |

| EC-01 | Search with nonexistent Employee ID | "No Records Found" message should be displayed with 0 employee rows. | Automated |

| EC-02 | Search with nonexistent Employee Name | "No Records Found" message should be displayed with 0 employee rows. | Automated |

| EC-03 | Search with nonexistent Supervisor Name | An appropriate validation or no-records message should be displayed. | Not Automated |

| EC-04 | Enter Employee Name exceeding 100 characters | The application should restrict input to 100 characters or display an appropriate validation error. | Not Automated |

I also added a network failure test using `page.route()` to check whether the employee search page remains usable and recovers after the request failure.

## Framework Details

I used Page Object Model (POM) to keep locators and actions separate from test cases. Common login steps are handled using fixtures to avoid repeated code.

By default, tests run in the QA environment. Staging can be configured using TEST_ENV and STAGING_BASE_URL.

Screenshots, videos and traces are saved for failed tests. Playwright HTML reports are used to check execution results.

Tests run in parallel using 2 workers. Failed tests are retried twice in CI. Screenshots, videos and traces are saved for failed tests.

## Known Limitations

- OrangeHRM is a public demo, so employee data may change.
- Tests may fail if the website is slow or unavailable.
- Some locators and API paths may need changes if OrangeHRM is updated.
- Two edge cases are documented but not automated.
- Employee records are not checked against fixed test data.

## Submission

The project includes JavaScript automation scripts, configuration files and README documentation.