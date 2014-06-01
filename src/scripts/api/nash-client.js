'use strict';


var Soda = require('./soda-client');

function NashClient(appToken, username, password) {
	Soda.call(this,{
		domain:'data.nashville.gov',
		appToken:appToken,
		username:username,
		password:password
	});
}
NashClient.prototype = Object.create(Soda.prototype);

NashClient.prototype.getParkLocations = function (params, callback) {
	this.get('74d7-b74t', params, callback);
};

NashClient.prototype.getParkSpecialEventPermits = function (params, callback) {
	this.get('vygj-v677', params, callback);
};

NashClient.prototype.getParkData = function (params, callback) {
	var events, locations, error,
		done = false;
	function tryComplete() {
		if (done) {
			return;
		}
		if (error) {
			done = true;
			callback(error);
		}
		if (events && locations) {
			done = true;
			callback(null, locations.concat(events));
		}
	}
	this.getParkLocations(params, function (err, data) {
		error = err || error;
		locations = data;
		tryComplete();
	});
	this.getParkSpecialEventPermits(params, function (err, data) {
		error = err || error;
		events = data;
		tryComplete();
	});
};

module.exports = NashClient;