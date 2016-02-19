(function() {

    var app = angular.module('customersApp', ['ngRoute','ngAnimate','ui.bootstrap']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
              controller: 'LoginController',
              templateUrl: 'user/client/views/user.client.views.login.html'
            })
            .when('/home', {
              controller: 'CustomersController',
              templateUrl: 'core/client/views/core.client.views.customers.html'
            })
            .when('/customers', {
                controller: 'CustomersController',
                templateUrl: 'core/client/views/core.client.views.customers.html'
            })
            .when('/orders/:customerId', {
                controller: 'OrdersController',
                templateUrl: 'core/client/views/core.client.views.orders.html'
            })
            .when('/register/', {
                controller: 'RegisterController',
                templateUrl: 'user/client/views/user.client.views.register.html'
            })
            .when('/login/', {
                controller: 'LoginController',
                templateUrl: 'user/client/views/user.client.views.login.html'
            })
            /*
            .when('/login/:redirect*?', {
                controller: 'LoginController',
                templateUrl: 'user/client/views/user.client.views.login.html'
            })*/
            .otherwise( { redirectTo: '/' } );
    });

    app.run([
  '$rootScope',
  function($rootScope) {
    // see what's going on when the route tries to change
    $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
      // both newUrl and oldUrl are strings
      console.log('Starting to leave %s to go to %s', oldUrl, newUrl);
    });
  }
]);


app.config(['$httpProvider',function($httpProvider) {

    $httpProvider.interceptors.push(function($q) {

        return {

            'responseError': function(rejection){

                var defer = $q.defer();

                if(rejection.status == 401){
                    //console.dir(rejection);
                    //$rootScope.$broadcast('redirectToLogin', null);
                    //$location.path=('/login');
                    window.location.href = ('index.html#/login/');
                    //return;
                }

                defer.reject(rejection);

                return defer.promise;

            }
        };
    });

}]);

}());
