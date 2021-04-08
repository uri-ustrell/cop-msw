const { readdirSync, existsSync } = require('fs');

const existsFile = pathToFile => existsSync(pathToFile);

const getDirectories = source => readdirSync(source, { withFileTypes: true })
  .filter(directory => directory.isDirectory())
  .map(directory => directory.name);

module.exports = { existsFile, getDirectories };
