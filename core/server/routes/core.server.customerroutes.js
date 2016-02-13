var customers = require('../controllers/core.server.customerscontroller');
var users = require('../../../user/server/controllers/user.server.controller.js');
module.exports = function( app) {
  app.route('/api/customers/currentPage/:currentPage/pageSize/:pageSize/sortBy/:sortBy/direction/:direction')
  .get(users.requiresLogin, customers.listAll);

  app.route('/api/customers/currentPage/:currentPage/pageSize/:pageSize/sortBy/:sortBy/direction/:direction/searchText/:searchText')
  .get(users.requiresLogin, customers.list);

  app.route('/api/customerstest')
  .get(customers.test);

  app.route('/api/customers/:customerId')
  .get( users.requiresLogin, customers.read);

   app.param('customerId', customers.customerByID);
};
