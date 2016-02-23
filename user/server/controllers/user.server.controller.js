require('../models/user.server.model');
var User = require('mongoose').model('User'),
passport = require('passport');

var getErrorMessage = function(err)
{
	var message = '';
	if (err.code)
	{
		switch (err.code)
		{
			case 11000:
			case 11001: message = 'Username already exists';
			break;
			default: message = 'Something went wrong';
		}
	}
	else
	{
		for (var errName in err.errors)
		{
			if (err.errors[errName].message)
			 message = err.errors[ errName].message;
		 }
	 }
	 return message;
 };

exports.renderSignin = function( req, res, next)
{
	if (!req.user)
	{
		//res.render('signin', { title: 'Sign-in Form',messages: req.flash('error') || req.flash('info') });
		return res.redirect('/signin');
	}
	else
	{
		return res.redirect('/');
	}
};

exports.renderSignup = function( req, res, next)
{
	if (!req.user)
	{
		//res.render('signup', { title: 'Sign-up Form', messages: req.flash('error') });
		return res.redirect('/signup');
	}
	else
	{
		return res.redirect('/');
	}
};

exports.signup = function( req, res, next)
{
	if (!req.user)
	{
		var user = new User( req.body);
		var message = null;
		user.provider = 'local';
		user.save(function( err){
					if(err)
					{
						var message = getErrorMessage(err);
						//req.flash('error', message);
					//	return res.redirect('/');
					return res.status(400).send({message:message});
					}
					req.login( user, function( err) {
						if (err) return next( err);
						return   res.json( {'status':true,'username':user.username,'email':user.email});

					});
		});
	} else {
		return res.redirect('/');
	}
};
exports.saveOAuthUserProfile = function(req, profile, done) {
	// Try finding a user document that was registered using the current OAuth provider
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, function(err, user) {
		// If an error occurs continue to the next middleware
		if (err) {
			return done(err);
		} else {
			// If a user could not be found, create a new user, otherwise, continue to the next middleware
			if (!user) {
				// Set a possible base username
				// Find a unique available username

					user = new User(profile);
					user.username=profile.email;
					// Try saving the new user document
					user.save(function(err) {
						// Continue to the next middleware
					return done(err, user);
					});
			} else {
				// Continue to the next middleware
				return done(err, user);
			}
		}
	});
};

exports.signout = function( req, res)
{
	req.logout();
	return   res.json({'status':true});

	//res.redirect('/');
};

exports.create = function(req,res,next)
{
	var user = new User(req.body);
	user.save(function(err){
		if(err){
			return next(err);
		} else {
			res.json(user);
		}
	});
};
exports.list = function( req, res, next)
{
	User.find({}, 'firstName lastName email website fullName userName', function( err, users)
	{
		if (err) { return next( err); }
		else {
			res.json( users);
		}
	});
};
exports.read = function( req, res)
{
	res.json( req.user);
};

exports.requiresLogin = function( req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({ message: 'User is not logged in' });
	}
	next();
};

/*exports.userByName = function( req, res, next, name)
{
	User.findOneByUsername(name, function( err, user)
	{
		if (err) {
			return next( err);
		} else {
			 req.user = user;
			 next();
		 }
	}
 );

};
*/

exports.userByID = function( req, res, next, id)
{
	 User.findOne({ _id: id},
		  function( err, user)
	 		{
				if (err) {
					return next( err);
				} else {
					 req.user = user;
					 next();
				 }
			 });
};
exports.update = function( req, res, next)
{
	 User.findByIdAndUpdate( req.user.id, req.body,
		 function( err, user)
		 {
			 if (err) {
				  return next( err);
				} else {
					res.json( user);
				}
			});
};

exports.delete = function( req, res, next)
{
	req.user.remove( function( err)
	{
		if (err) {
			 return next( err);
		 } else {
			 res.json( req.user);
		 }
	 });
};
