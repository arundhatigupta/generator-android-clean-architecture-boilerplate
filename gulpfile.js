'use strict';
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var nsp = require('gulp-nsp');

function staticFiles() {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Watch files
function watchFiles() {
  gulp.watch(['generators/**/*.js']);
}

const build = gulp.series(staticFiles);
const watch = gulp.parallel(watchFiles);
// const prepublish = gulp.series(prepublishCb);

// Export tasks
// exports.prepublish = prepublish;
exports.build = build;
exports.watch = watch;
exports.default = staticFiles;
