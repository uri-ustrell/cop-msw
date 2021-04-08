const { readFile, writeFile, readdirSync, existsSync } = require('fs');
const path = require('path');
const configVars = require('./env.json');
const pkg = require('../package.json');

const existsFile = pathToFile => existsSync(pathToFile);

const getDirectories = source => readdirSync(source, { withFileTypes: true })
  .filter(directory => directory.isDirectory())
  .map(directory => directory.name);

const writeToManifest = (url) => {
  const { MANGO_ENV } = process.env;

  readFile(url, (errReadFile, data) => {
    if (errReadFile) {
      throw errReadFile;
    }
    const manifest = JSON.parse(data);
    const currentEnvVars = configVars[MANGO_ENV];
    const updatedManifest = JSON.stringify({
      ...manifest,
      env: { ...currentEnvVars },
    });

    writeFile(url, updatedManifest, (errWriteFile) => {
      if (errWriteFile) {
        throw errWriteFile;
      }
      return console.log(`Updated manifest.json with ${MANGO_ENV} env vars --> ${url}`);
    });
  });
};

const specificName = pkg.entry;
const existsIndexFile = existsFile(path.resolve(__dirname, `../src/${specificName}/index.jsx`));
const directoriesSpecific = getDirectories(path.resolve(__dirname, `../src/${specificName}`));

// eslint-disable-next-line no-unused-expressions
existsIndexFile
  ? writeToManifest(`./dist/${specificName}/manifest.json`)
  : directoriesSpecific.forEach((directoryName) => {
    writeToManifest(`./dist/${specificName}/${directoryName}/manifest.json`);
  });
