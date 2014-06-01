'use strict';

var gulp = require('gulp'),
	clean = require('gulp-clean');

module.exports = function cleanBin() {
	return gulp.src(['./bin'])
		.pipe(clean());
};