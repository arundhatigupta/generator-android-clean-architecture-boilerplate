'use strict';

const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    this.log(yosay(
      'Welcome to ' + chalk.red('Android Starter') + ' generator!'
    ));

    const prompts = [
      {
        name: 'name',
        message: 'What will be the name of your app?',
        store: true,
        default: this.appname
      },
      {
        name: 'package',
        message: 'What package will you be publishing the app under?'
      },
      {
        type: 'list',
        name: 'language',
        message: 'What language would you like to use? ',
        choices: [
          {
            value: 'kotlin',
            name: 'Kotlin'
          }
        ],
        default: 0
      },
      {
        name: 'targetSdk',
        message: 'What Android SDK will you be targeting?',
        store: true,
        default: 26
      },
      {
        name: 'minSdk',
        message: 'What is the minimum Android SDK you wish to support?',
        store: true,
        default: 19
      }
];

    return this.prompt(prompts).then(props => {
      this.props.appPackage = props.package;
      this.props.language = props.language;
      this.props.appName = props.name;
      this.appName = props.name;
      this.appPackage = props.package;
      this.androidTargetSdkVersion = props.targetSdk;
      this.androidMinSdkVersion = props.minSdk;
    });
  }

  writing() {
    var packageDir = this.props.appPackage.replace(/\./g, '/');

    var rootFolder = 'template-kotlin';

    mkdirp('app');
    mkdirp('app/src/main/java/' + packageDir + '/app');
    mkdirp('app/src/androidTest/java/' + packageDir + '/app');
    mkdirp('app/src/test/java/' + packageDir + '/app');

    mkdirp('data');
    mkdirp('data/src/main/java/' + packageDir + '/data');
    mkdirp('data/src/androidTest/java/' + packageDir + '/data');
    mkdirp('data/src/test/java/' + packageDir + '/data');

    mkdirp('device');
    mkdirp('device/src/main/java/' + packageDir + '/device');
    mkdirp('device/src/androidTest/java/' + packageDir + '/device');
    mkdirp('device/src/test/java/' + packageDir + '/device');

    mkdirp('domain');
    mkdirp('domain/src/main/java/' + packageDir + '/domain');

    var rootPath = this.sourceRoot() + '/' + rootFolder + '/';

    this.fs.copy(rootPath + 'gitignore', '.gitignore');
    this.fs.copy(rootPath + 'build.gradle', 'build.gradle');
    this.fs.copy(rootPath + 'gradle.properties', 'gradle.properties');
    this.fs.copy(rootPath + 'dependencies.gradle', 'dependencies.gradle');
    this.fs.copy(rootPath + 'gradlew', 'gradlew');
    this.fs.copy(rootPath + 'gradlew.bat', 'gradlew.bat');
    this.fs.copy(rootPath + 'settings.gradle', 'settings.gradle');
    this.fs.copy(rootPath + 'app/gitignore', 'app/.gitignore');
    this.fs.copy(rootPath + 'app/build.gradle', 'app/build.gradle');
    this.fs.copy(rootPath + 'app/proguard-rules.pro', 'app/proguard-rules.pro');

    this.fs.copy(rootPath + 'data/gitignore', 'data/.gitignore');
    this.fs.copy(rootPath + 'data/build.gradle', 'data/build.gradle');
    this.fs.copy(rootPath + 'data/proguard-rules.pro', 'data/proguard-rules.pro');

    this.fs.copy(rootPath + 'device/gitignore', 'device/.gitignore');
    this.fs.copy(rootPath + 'device/build.gradle', 'device/build.gradle');
    this.fs.copy(rootPath + 'device/proguard-rules.pro', 'device/proguard-rules.pro');

    this.fs.copy(rootPath + 'domain/gitignore', 'domain/.gitignore');
    this.fs.copy(rootPath + 'domain/build.gradle', 'domain/build.gradle');

    this.fs.copy(rootPath + 'gradle', 'gradle');
    this.fs.copy(rootPath + 'app/src/main/res', 'app/src/main/res');
    this.fs.copy(rootPath + 'data/src/main/res', 'data/src/main/res');
    this.fs.copy(rootPath + 'device/src/main/res', 'device/src/main/res');

    this.fs.copyTpl(rootPath + 'app/build.gradle', 'app/build.gradle', this.props);
    this.fs.copyTpl(rootPath + 'app/src/androidTest/java/com/arundhati/androidcleanarchitectureboilerplate/app', 'app/src/androidTest/java/' + packageDir + '/app', this.props);
    this.fs.copyTpl(rootPath + 'app/src/main/AndroidManifest.xml', 'app/src/main/AndroidManifest.xml', this.props);
    this.fs.copyTpl(rootPath + 'app/src/main/java/com/arundhati/androidcleanarchitectureboilerplate/app', 'app/src/main/java/' + packageDir + '/app', this.props);
    this.fs.copyTpl(rootPath + 'app/src/main/res', 'app/src/main/res', this.props);
    this.fs.copyTpl(rootPath + 'app/src/test/java/com/arundhati/androidcleanarchitectureboilerplate/app', 'app/src/test/java/' + packageDir + '/app', this.props);

    this.fs.copyTpl(rootPath + 'data/build.gradle', 'data/build.gradle', this.props);
    this.fs.copyTpl(rootPath + 'data/src/androidTest/java/com/arundhati/androidcleanarchitectureboilerplate/data', 'data/src/androidTest/java/' + packageDir + '/data', this.props);
    this.fs.copyTpl(rootPath + 'data/src/main/AndroidManifest.xml', 'data/src/main/AndroidManifest.xml', this.props);
    this.fs.copyTpl(rootPath + 'data/src/main/java/com/arundhati/androidcleanarchitectureboilerplate/data', 'data/src/main/java/' + packageDir + '/data', this.props);
    this.fs.copyTpl(rootPath + 'data/src/main/res', 'data/src/main/res', this.props);
    this.fs.copyTpl(rootPath + 'data/src/test/java/com/arundhati/androidcleanarchitectureboilerplate/data', 'data/src/test/java/' + packageDir + '/data', this.props);

    this.fs.copyTpl(rootPath + 'device/build.gradle', 'device/build.gradle', this.props);
    this.fs.copyTpl(rootPath + 'device/src/androidTest/java/com/arundhati/androidcleanarchitectureboilerplate/device', 'device/src/androidTest/java/' + packageDir + '/device', this.props);
    this.fs.copyTpl(rootPath + 'device/src/main/AndroidManifest.xml', 'device/src/main/AndroidManifest.xml', this.props);
    this.fs.copyTpl(rootPath + 'device/src/main/java/com/arundhati/androidcleanarchitectureboilerplate/device', 'device/src/main/java/' + packageDir + '/device', this.props);
    this.fs.copyTpl(rootPath + 'device/src/main/res', 'device/src/main/res', this.props);
    this.fs.copyTpl(rootPath + 'device/src/test/java/com/arundhati/androidcleanarchitectureboilerplate/device', 'device/src/test/java/' + packageDir + '/device', this.props);

    this.fs.copyTpl(rootPath + 'domain/build.gradle', 'domain/build.gradle', this.props);
    this.fs.copyTpl(rootPath + 'domain/src/main/java/com/arundhati/androidcleanarchitectureboilerplate/domain', 'domain/src/main/java/' + packageDir + '/domain', this.props);
  }
};
