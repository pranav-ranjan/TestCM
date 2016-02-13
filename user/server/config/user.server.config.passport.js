// Invoke 'strict' JavaScript mode
/*jslint node: true */
'use strict';

// Load the module dependencies
var passport = require('passport'),
	mongoose = require('mongoose');

// Define the Passport configuration method
module.exports = function() {
	// Load the 'User' model
	var User = mongoose.model('User');

	// Use Passport's 'serializeUser' method to serialize the user id
	passport.serializeUser(function(user, done) {
		console.log("serialize user" + user);
		done(null, user.id);
	});

	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-password -salt', function(err, user) {
			done(err, user);
		});
	});

	// Load Passport's strategies configuration files
	require('../../../user/server/strategies/user.server.config.strategies.local.js')();
	require('../../../user/server/strategies/facebook.js')();

	//require('./strategies/twitter.js')();
	//require('./strategies/facebook.js')();
	//require('./strategies/google.js')();
};
