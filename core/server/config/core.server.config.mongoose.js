var config = require('./core.server.config.config'),
mongoose = require('mongoose');

module.exports=function()
{
	var db = mongoose.connect(config.db);
	require('../models/core.server.customermodel');
	return db;
};
