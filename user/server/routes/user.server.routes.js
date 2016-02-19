var users = require('../controllers/user.server.controller'),
passport = require('passport');
module.exports=function(app){

	app.route('/api/users/register')
	//.get( users.renderSignup)
	.post( users.signup,function(req,res){
		res.json({status:true,username:req.user.username,email:req.user.email,sessionID:req.sessionID});
	});

  app.route('/api/users/signout')
	.post(users.signout,function(req,res){
		res.json({status:true});
	});

	app.route('/api/users/signin')
	//.get( users.renderSignin)
	.post( passport.authenticate('local'),function(req,res){
		res.json({status:true,username:req.user.username,email:req.user.email,sessionID:req.sessionID});
	});

	app.get('/oauth/facebook', passport.authenticate('facebook',
	{
		failureRedirect:'/login/'
	}));

	/*
	app.get('/oauth/facebook/callback', function(req,res,next){

		passport.authenticate('facebook',function(req,res){
			res.json({status:true,username:req.user.username,email:req.user.email});
		})
	});
	*/
	app.get('/oauth/facebook/callback',passport.authenticate('facebook',
	{
		failureRedirect:'/login/',
		successRedirect:'/'
	}) );







	/*app.route('/users')
	.post(users.create)
	.get(users.list);

	app.route('/users/:userId')
	.get( users.read)
	.put(users.update)
	.delete(users.delete);
	app.param('userId', users.userByID);

	app.route('/usersbyname/:userName')
	.get( users.userByName);
	app.param('userName', users.userByName);
	*/
};
