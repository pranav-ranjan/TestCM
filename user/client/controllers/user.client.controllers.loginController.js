(function () {

    var injectParams = ['$scope','$location', '$routeParams', '$remember','userService'];

    var LoginController = function ($scope,$location, $routeParams, $remember,authService) {
        var path = '/home';
        $scope.remember = false;
        $scope.email = null;
        $scope.password = null;
        $scope.errorMessage = null;

        if ($remember('email') && $remember('password') ) {
            $scope.remember = true;
            $scope.email = $remember('email').toString();
            $scope.password = $remember('password').toString();
        }
        $scope.rememberMe = function() {
            if ($scope.remember) {
                if($scope.email === null || $scope.password === null)
                {
                  $scope.remember=false;
                  return;
                }
                $remember('email', $scope.email);
                $remember('password', $scope.password);
            } else {
                $remember('email', '');
                $remember('password', '');

            }
        };
        $scope.login = function () {
            authService.login($scope.email, $scope.password).then(function (status) {
                //$routeParams.redirect will have the route
                //they were trying to go to initially
                if (!status) {
                    $scope.errorMessage = 'Unable to login';
                    return;
                }

                if (status && $routeParams && $routeParams.redirect) {
                    path = path + $routeParams.redirect;
                }

                $location.path(path);
            },
            function(reason){
              $scope.errorMessage = reason.data;
            }
          );
        };
    };

    LoginController.$inject = injectParams;

    angular.module('customersApp')
        .controller('LoginController', LoginController);

}());
