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

module.exports = NashClient;