var passport = require('passport'),
url = require('url'),
FacebookStrategy = require('passport-facebook').Strategy,

config = require('../../../core/server/config/core.server.config.config'),
users = require('../controllers/user.server.controller');
module.exports = function() {
   passport.use( new FacebookStrategy({
     clientID: config.facebook.clientID,
     clientSecret: config.facebook.clientSecret,
     callbackURL: config.facebook.callbackURL,
     profileFields:config.facebook.profileFields,
     //scope:["email"],
     passReqToCallback: true },
     function( req, accessToken, refreshToken, profile, done) {
       var providerData = profile._json;
       //providerData.accessToken = accessToken;
       providerData.refreshToken = refreshToken;

       var providerUserProfile = {
         firstName: profile.name.givenName,
         lastName: profile.name.familyName,
         fullName: profile.displayName,
         email: profile.emails[0].value,
         //username: profile.username,
         userName: profile.displayName,
         provider: 'facebook',
         providerId: profile.id,
         providerData: providerData
       };
       users.saveOAuthUserProfile( req, providerUserProfile, done);
    }));
};
