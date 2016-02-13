module.exports = {
//Development configuration options
db:"mongodb://localhost/customermanager",
sessionSecret:"developmentSessionSecret",
facebook: {
  clientID: '108009839548110',
  clientSecret: '33dd3e3493678efd2006071bfbdc3e26',
  callbackURL: 'http://localhost:8085/oauth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
}
};
