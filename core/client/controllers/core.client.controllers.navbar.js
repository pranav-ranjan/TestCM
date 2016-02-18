(function() {

    var NavbarController = function ($scope, $routeParams,$log,$location,customersFactory,userService) {
      NavbarController.$inject = ['$scope', '$routeParams','$log','$location','customersFactory','userService'];

      $scope.appTitle = "The App";

        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) === path;
        };
        $scope.isAuthenticated = function(){
          return userService.user.isAuthenticated;
        }
        $scope.loginOrOut = function () {
            setLoginLogoutText();
            var isAuthenticated = userService.user.isAuthenticated;
            if (isAuthenticated) { //logout
                userService.logout().then(function () {
                    redirectToLogin();
                    return;
                });
            }
            redirectToLogin();
        };

        function redirectToLogin() {
            //var path = '/login' + $location.$$path;
            var path = '/login';
            $location.replace();
            $location.path(path);
        }

        $scope.$on('loginStatusChanged', function (loggedIn) {
            setLoginLogoutText(loggedIn);

        });

        $scope.$on('redirectToLogin', function () {
            redirectToLogin();
        });

        function setLoginLogoutText() {
            $scope.loginLogoutText = (userService.user.isAuthenticated) ? 'Logout' : 'Login';
        }

        setLoginLogoutText();
      }
      angular.module('customersApp')
        .controller('NavbarController', NavbarController);

      }());

      angular.module('customersApp').controller('DropdownCtrl', function($scope) {

        $scope.items = [
            "The first choice!",
            "And another choice for you.",
            "but wait! A third!"
        ];
      });
      angular.module('customersApp').controller('MainCtrl', function($scope) {

        $scope.name="Pranav";
      });
