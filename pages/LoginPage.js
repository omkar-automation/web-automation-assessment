const { expect } = require('@playwright/test');
const { paths, messages } = require('../config/constants');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.invalidMessage = page.getByText(messages.invalidCredentials, { exact: true });
  }

  async open() {
    await this.page.goto(paths.login);
    await expect(this.loginButton).toBeVisible();
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async assertInvalidCredentials() {
    await expect(this.invalidMessage).toBeVisible();
    await expect(this.page).toHaveURL(/\/auth\/login/);
  }
}
module.exports = { LoginPage };
