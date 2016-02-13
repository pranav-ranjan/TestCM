(function() {

    var OrdersController = function ($scope, $routeParams,$log,customersFactory) {
        var customerId = $routeParams.customerId;
        $scope.customer = null;
        function init() {
            //Search the customers for the customerId
          customersFactory.getCustomer(customerId)
            .success(function(customer){
              $scope.customer = customer;
            })
            .error(function(data){
              $log.log(data);
            });
        }
        init();
    };

    OrdersController.$inject = ['$scope', '$routeParams','$log','customersFactory'];

    angular.module('customersApp')
      .controller('OrdersController', OrdersController);

}());
