// Invoke 'strict' JavaScript mode
/*jslint node: true */
'use strict';

// Load the module dependencies
var config = require('./core.server.config.config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	passport = require('passport');

// Define the Express configuration method
module.exports = function() {
	// Create a new Express application instance
	var app = express();

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware


	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));


	app.use(passport.initialize());
	app.use(passport.session());

	require('../routes/core.server.customerroutes.js')(app);
	require('../../../user/server/routes/user.server.routes.js')(app);
	//  app.use(express.static(__dirname, '/'));
    app.use(express.static('./public'));
  app.use(express.static('./'));

	// Return the Express application instance
	return app;
};
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if ('OPTIONS' == req.method) {
    	res.send(200);
    }
    else {
    	next();
    }
}; 
