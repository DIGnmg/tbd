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

module.exports = NashClient;