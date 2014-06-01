'use strict';

var gulp = require('gulp'),
	path = require('path'),
	browserify = require('browserify'),
	mold = require('mold-source-map'),
	source = require('vinyl-source-stream'),
	delta = require('gulp-delta');

module.exports = function browserifyTask() {
	return browserify('./scripts/main.js', {
			basedir:'./src'
		})
		.bundle({
			insertGlobals:false,
			detectGlobals:true,
			debug: (process.env.NODE_ENV !== 'production')
		})
		.pipe(mold.transformSourcesRelativeTo('./src'))
		.pipe(source('main.js'))
		.pipe(delta('./bin/scripts'))
		.pipe(gulp.dest('./bin/scripts'));
};
