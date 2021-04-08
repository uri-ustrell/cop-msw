require('dotenv').config();
const appRoot = require('app-root-path');
const { existsFile, getDirectories } = require('./config/utils');
const createWebpackConfiguration = require('./config/webpack');
const pkg = require('./package.json');

module.exports = (env, argv) => {
  const configs = [];

  if (env && env.entry) {
    configs.push(createWebpackConfiguration(env, argv, process.env.ENTRY));
  } else {
    const specificName = pkg.entry;
    const existsIndexFile = existsFile(`${appRoot}/src/${specificName}/index.jsx`);
    const directoriesSpecific = getDirectories(`${appRoot}/src/${specificName}`);

    if (existsIndexFile) {
      configs.push(createWebpackConfiguration(env, argv, specificName));
    } else if (directoriesSpecific.length > 0) {
      directoriesSpecific.forEach((directoryName) => {
        configs.push(createWebpackConfiguration(env, argv, `${specificName}/${directoryName}`));
      });
    }
  }

  return configs;
};
