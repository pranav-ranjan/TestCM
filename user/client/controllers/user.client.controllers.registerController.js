(function () {

    var injectParams = ['$scope','$location', '$routeParams', 'userService'];

    var RegisterController = function ($scope,$location, $routeParams, authService) {
        var path = '/';

        $scope.fname = null;
        $scope.lname = null;

        $scope.email = null;
        $scope.password = null;
        $scope.errorMessage = null;

        $scope.register = function () {
            authService.register($scope.fname,$scope.lname,$scope.email, $scope.password).then(function (status) {
                //$routeParams.redirect will have the route
                //they were trying to go to initially
                if (!status) {
                    $scope.errorMessage = 'Unable to register';
                    return;
                }

                if (status && $routeParams && $routeParams.redirect) {
                    path = path + $routeParams.redirect;
                }

                $location.path(path);
            },
            function(reason){
              $scope.errorMessage = reason.data.message;
            });
        };
    };

    RegisterController.$inject = injectParams;

    angular.module('customersApp')
        .controller('RegisterController', RegisterController);

}());
