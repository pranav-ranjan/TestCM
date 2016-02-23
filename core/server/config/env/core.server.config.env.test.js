/*jslint node:true */
'use strict';
module.exports = {
//Test configuration options
    db: "mongodb://localhost/customermanager-test",
    sessionSecret: "testSessionSecret",
    facebook: {
        clientID: 'xxx',
        clientSecret: 'yyy',
        callbackURL: 'http://localhost:8085/oauth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
    }
};