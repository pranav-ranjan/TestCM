module.exports = {
//Development configuration options
db:"mongodb://localhost/customermanager",
sessionSecret:"developmentSessionSecret",
facebook: {
  clientID: 'xxx',
  clientSecret: 'yyy',
  callbackURL: 'http://localhost:8085/oauth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
}
};
