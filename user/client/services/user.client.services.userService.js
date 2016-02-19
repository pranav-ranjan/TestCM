(function () {

    var injectParams = ['$http', '$rootScope','$window'];

    var authFactory = function ($http, $rootScope,$window) {
        var serviceBase = '/api/users/',
            factory = {
                loginPath: '/login',
                user: {
                    isAuthenticated: false,
                    roles: null,
                    email:null,
                    sessionID:null,
                    userName:null
                }
            };

        factory.login = function (email, password) {
            return $http.post(serviceBase + 'signin', { username: email, password: password } ).then(
                function (results) {
                    var loggedIn = results.data.status;
                    factory.user.email=results.data.email;
                    factory.user.sessionID = results.data.sessionID;
                    factory.user.userName = results.data.username;
                    changeAuth(loggedIn);
                    $window.sessionStorage["userInfo"] = JSON.stringify(factory.user);
                    return loggedIn;
                });
        };

        factory.register = function (fname,lname,email, password) {
            return $http.post(serviceBase + 'register', {firstname:fname,lastname:lname, username:email, email: email, password: password } ).then(
                function (results) {
                    var loggedIn = results.data.status;
                    factory.user.email=results.data.email;
                    factory.user.sessionID = results.data.sessionID;
                    factory.user.userName = results.data.username;
                    changeAuth(loggedIn);
                    $window.sessionStorage["userInfo"] = JSON.stringify(factory.user);
                    return loggedIn;
                });
        };

        factory.logout = function () {
            return $http.post(serviceBase + 'signout').then(
                function (results) {
                    var loggedIn = !results.data.status;
                    $window.sessionStorage["userInfo"] = null;
                    changeAuth(loggedIn);
                    return loggedIn;
                });
        };

        factory.redirectToLogin = function () {
            $rootScope.$broadcast('redirectToLogin', null);
        };
        function init() {
          if ($window.sessionStorage["userInfo"] && "null" != $window.sessionStorage["userInfo"]) {
            factory.user = JSON.parse($window.sessionStorage["userInfo"]);
          }
        }

        init();
        function changeAuth(loggedIn) {
            factory.user.isAuthenticated = loggedIn;
            $rootScope.$broadcast('loginStatusChanged', loggedIn);
        }

        return factory;
    };

    authFactory.$inject = injectParams;

    angular.module('customersApp').factory('userService', authFactory);

}());
(function () {

      angular.module('customersApp').factory('$remember', function() {
            function fetchValue(name) {
                var gCookieVal = document.cookie.split("; ");
                for (var i=0; i < gCookieVal.length; i++)
                {
                    // a name/value pair (a crumb) is separated by an equal sign
                    var gCrumb = gCookieVal[i].split("=");
                    if (name === gCrumb[0])
                    {
                        var value = '';
                        try {
                            value = angular.fromJson(gCrumb[1]);
                        } catch(e) {
                            value = unescape(gCrumb[1]);
                        }
                        return value;
                    }
                }
                // a cookie with the requested name does not exist
                return null;
            }
            return function(name, values) {
                if(arguments.length === 1) return fetchValue(name);
                var cookie = name + '=';
                if(typeof values === 'object') {
                    var expires = '';
                    cookie += (typeof values.value === 'object') ? angular.toJson(values.value) + ';' : values.value + ';';
                    if(values.expires) {
                        var date = new Date();
                        date.setTime( date.getTime() + (values.expires * 24 *60 * 60 * 1000));
                        expires = date.toGMTString();
                    }
                    cookie += (!values.session) ? 'expires=' + expires + ';' : '';
                    cookie += (values.path) ? 'path=' + values.path + ';' : '';
                    cookie += (values.secure) ? 'secure;' : '';
                } else {
                    cookie += values + ';';
                }
                document.cookie = cookie;
            }
        });



}());
