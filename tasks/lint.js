'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint');

module.exports = function lintScripts() {
	return gulp.src('./src/scripts/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter());
};