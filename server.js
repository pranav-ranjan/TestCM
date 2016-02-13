var mongoose = require('./core/server/config/core.server.config.mongoose'),
    express = require('./core/server/config/core.server.config.express'),
    passport = require('./user/server/config/user.server.config.passport');
    app = express();
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    var db = mongoose();
    var passport = passport();





app.listen(8085);

console.log('Express listening on port 8085');
module.exports = app;
