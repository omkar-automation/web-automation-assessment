const paths = {
  login: '/web/index.php/auth/login',
  dashboard: '/web/index.php/dashboard/index',
  employees: '/web/index.php/pim/viewEmployeeList',
};
const credentials = {
  username: process.env.ORANGEHRM_USERNAME || 'Admin',
  password: process.env.ORANGEHRM_PASSWORD || 'admin123',
};
const messages = {
  invalidCredentials: 'Invalid credentials',
  noRecords: 'No Records Found',
};
module.exports = { paths, credentials, messages };
