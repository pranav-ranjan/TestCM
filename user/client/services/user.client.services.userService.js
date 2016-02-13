(function () {

    var injectParams = ['$http', '$rootScope'];

    var authFactory = function ($http, $rootScope) {
        var serviceBase = '/api/users/',
            factory = {
                loginPath: '/login',
                user: {
                    isAuthenticated: false,
                    roles: null
                }
            };

        factory.login = function (email, password) {
            return $http.post(serviceBase + 'signin', { username: email, password: password } ).then(
                function (results) {
                    var loggedIn = results.data.status;;
                    changeAuth(loggedIn);
                    return loggedIn;
                });
        };

        factory.register = function (fname,lname,email, password) {
            return $http.post(serviceBase + 'register', {firstname:fname,lastname:lname, username:email, email: email, password: password } ).then(
                function (results) {
                    var loggedIn = results.data.status;;
                    changeAuth(loggedIn);
                    return loggedIn;
                });
        };

        factory.logout = function () {
            return $http.post(serviceBase + 'signout').then(
                function (results) {
                    var loggedIn = !results.data.status;
                    changeAuth(loggedIn);
                    return loggedIn;
                });
        };

        factory.redirectToLogin = function () {
            $rootScope.$broadcast('redirectToLogin', null);
        };

        function changeAuth(loggedIn) {
            factory.user.isAuthenticated = loggedIn;
            $rootScope.$broadcast('loginStatusChanged', loggedIn);
        }

        return factory;
    };

    authFactory.$inject = injectParams;

    angular.module('customersApp').factory('userService', authFactory);

}());
