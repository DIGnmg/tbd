'use strict';

var gulp = require('gulp'),
  build = require('./tasks')([
  'lint',
  'server',
  'html',
  'scripts',
  'styles',
  'copy',
  'clean'
]);

build.register('test', ['lint']);
build.register('compile', ['copy',['styles','scripts','html']]);
build.register('build', ['clean','compile']);
build.register('watch', ['build'], function () {
  return gulp.watch(['./src/**/*'], ['compile']);
});
build.register('debug', [['watch','server']]);
build.register('default', ['build']);
