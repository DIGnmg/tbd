'use strict';

var gulp = require('gulp'),
	delta = require('gulp-delta'),
	include = require('gulp-file-include'),
	special = require('gulp-special-html');

module.exports = function processHtml() {
	return gulp.src(['./src/**/*.html','!*.incl.html'])
		.pipe(include({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(special())
		.pipe(delta('./bin'))
		.pipe(gulp.dest('./bin'));
};