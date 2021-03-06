(function () {
    "use strict";

    angular.module("adminlte").factory("UserService", ServiceFn);

    /**
     * @ngInject
     * @type {string[]}
     */
    ServiceFn.$inject = ["$http","$location", "$rootScope", "$cookies"];

    /**
     * Service
     * @param $location
     * @param $rootScope
     * @returns {{getUser: (function(): {name: null, image: null, registerDate: null, job: null}), isLogined: (function(): boolean), login: loginFn, logout: logoutFn}}
     * @constructor
     */
    function ServiceFn($http, $location, $rootScope, $cookies) {

        var user = {
            name: null,
            image: null,
            registerDate: null,
            job: null,
            authorization: null
        };

        return {
            getUser: getUserFn,
            isLogined: isLoginedFn,
            login: loginFn,
            logout: logoutFn
        };

        function getUserFn() {
            return user;
        }

        function isLoginedFn() {
            let globals = $cookies.getObject('globals');
            if(globals !== undefined){
                user.name = globals.currentUser.name;
                user.authorization = globals.currentUser.authorization;
                $http.defaults.headers.common['Authorization'] = user.authorization;
                return true;
            } else {
                user.name = null;
                user.authorization = null;
                $http.defaults.headers.common['Authorization'] = null;
                return false;
            }
        }

        function loginFn(userData) {

            user.name = userData.name;
            user.image = userData.image;
            user.registerDate = userData.registerDate;
            user.job = userData.job;
            user.authorization = userData.authorization;

            $rootScope.globals = {
                currentUser: {
                    name:  user.name,
                    authorization: user.authorization
                }
            };

            $cookies.putObject("globals", $rootScope.globals);

            $location.path("/");
        }

        function logoutFn() {
            user.name = null;
            user.image = null;
            user.registerDate = null;
            user.job = null;
            user.authorization = null;

            $rootScope.globals = {
                currentUser: null
            };
            $cookies.remove("globals");

            $location.path("/login");
        }
    }
})();