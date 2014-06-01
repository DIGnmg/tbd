'use strict';

var gulp = require('gulp'),
	delta = require('gulp-delta'),
	styl = require('gulp-styl'),
	inline = require('rework-inline'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('gulp-autoprefixer');

module.exports = function processCss() {
	return gulp.src(['./src/styles/app.styl'])
		.pipe(styl(
			inline()
		))
		.pipe(autoprefixer())
		.pipe(delta('./bin/styles'))
		.pipe(gulp.dest('./bin/styles'));
};