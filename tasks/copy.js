'use strict';

var gulp = require('gulp'),
	delta = require('gulp-delta');

module.exports = function copyFiles() {
	return gulp.src(['./src/**/*.*','!**/*.js','!**/*.less','!**/*.html'])
		.pipe(delta('./bin'))
		.pipe(gulp.dest('./bin'));
};
