/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const Rsync = require("rsync");
const path = require("path");
const homedir = require("os").homedir();
const packageName = require("../../package.json").name;
require("dotenv").config();

const rsync = new Rsync()
  .shell("ssh")
  .flags("avz")
  .chmod("ugo=rwX")
  .set("e", `ssh -o StrictHostKeyChecking=no -i ${path.join(homedir, ".ssh/AmazonTests.ppk")}`)
  .source("dist/")
  .delete()
  .destination(
    `ubuntu@${process.env.CLOUDTEST}.dev.mango.com:/opt/deploy/code/dev-microfrontend/${packageName}`
  );

rsync.execute(error => {
  if (error) console.error(error);
});

console.log(rsync.command());
