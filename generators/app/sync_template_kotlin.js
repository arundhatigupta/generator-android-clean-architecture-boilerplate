'use strict';

const path = require('path');
const rimraf = require('rimraf');
const mv = require('mv');
const clone = require('nodegit').Clone;
const replace = require('replace');
const ncp = require('ncp').ncp;

clone('https://github.com/arundhatigupta/android-clean-architecture-boilerplate.git', './tmp')
  .then(function (repo) {
    checkOutAndCopy(repo, 'master');
  })
  .catch(function (err) {
    console.log(err);
  });

function checkOutAndCopy(repo, name) {
  repo.getBranch('refs/remotes/origin/' + name)
    .then(function (reference) {
      console.log('Checking out branch ' + name);
      return repo.checkoutRef(reference);
    })
    .then(function () {
      replace({
        regex: 'com.arundhati.androidcleanarchitectureboilerplate',
        replacement: '<%= appPackage %>',
        paths: ['./tmp/app'],
        recursive: true,
        silent: true
      });

      replace({
        regex: '<string name="app_name">Android Clean Architecture Boilerplate</string>',
        replacement: '<string name="app_name"><%= appName %></string>',
        paths: ['./tmp/app'],
        recursive: true,
        silent: true
      });

      mv('./tmp/.gitignore', './tmp/gitignore', function (err) {
        if (err) {
          console.log(err);
        }

        console.log('Renamed root folder .gitignore');
      });

      mv('./tmp/app/.gitignore', './tmp/app/gitignore', function (err) {
        if (err) {
          console.log(err);
        }

        console.log('Renamed app folder .gitignore');
      });

      rimraf.sync(path.join(__dirname, '/tmp/.git'));

      console.log('Copying files to ./templates/template-kotlin');

      ncp.limit = 1600;
      ncp('./tmp', './templates/template-kotlin', function (err) {
        if (err) {
          return console.error(err);
        }

        console.log('Copying complete!');
        rimraf.sync(path.join(__dirname, '/tmp'));
      });
    });
}
