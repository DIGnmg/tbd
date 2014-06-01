'use strict';

var build = require('gulp-scenario');

module.exports = function (tasks) {
	if (Array.isArray(tasks)) {
		tasks.forEach(function (name) {
			build.task(name, require('./' + name));
		});
	} else if (tasks != null && typeof tasks === 'object') {
		Object.keys(tasks).forEach(function (name) {
			build.task(name, tasks[name], require('./' + name));
		});
	}
	return build;
};