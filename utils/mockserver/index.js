const mockServer = require('node-mock-server');
const path = require('path');

mockServer({
  restPath: path.join(__dirname, '/rest'),
  uiPath: '/',
  title: 'Api mock server',
  version: 1,
  urlBase: 'http://localhost:3001',
  urlPath: '',
  port: 3001,
  contentType: 'application/json',
  accessControlExposeHeaders: 'X-Total-Count',
  accessControlAllowOrigin: '*',
  accessControlAllowMethods: 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
  accessControlAllowHeaders: '*',
  accessControlAllowCredentials: 'true',
  headers: {},
  optionsFallbackPath: path.join(__dirname, '/rest/_optionsFallback/#/OPTIONS/'),
  open: true,
  dirName: __dirname,
});
