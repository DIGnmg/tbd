'use strict';

var gulp = require('gulp'),
	delta = require('gulp-delta'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer');

module.exports = function processCss() {
	return gulp.src(['./src/styles/main.less'])
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(delta('./bin/styles'))
		.pipe(gulp.dest('./bin/styles'));
};
