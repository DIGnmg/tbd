'use strict';

var gulp = require('gulp'),
	connect = require('gulp-connect');

module.exports = function () {
	connect.server({
		root: ['bin'],
		port: 8080,
		livereload: true
	});

	return gulp.watch(['./bin/**/*'], function (event) {
		gulp.src(event.path)
			.pipe(connect.reload());
	});
};