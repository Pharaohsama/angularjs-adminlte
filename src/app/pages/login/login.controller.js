(function () {
    'use strict';

    angular.module('adminlte').config(configFn);

    /**
     * @ngInject
     * @type {string[]}
     */
    configFn.$inject = ['$stateProvider'];

    /**
     * Config
     *
     * @param $stateProvider
     */
    function configFn($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                'main@': {
                    templateUrl: 'app/pages/login/login.html',
                    controller: ControllerFn,
                    controllerAs: 'vmLogin'
                }
            },
            bodyClass: 'login-page'
        });
    }

    ControllerFn.$inject = ["UserService", "$location", "$scope", "$http"];

    /**
     * Controller Function
     *
     * @param $scope
     * @param UserService
     * @param $location
     * @param $http
     * @constructor
     */
    function ControllerFn(UserService, $location, $scope, $http, $cookies) {
        var vm = this;

        vm.userData = {
            name: null,
            image: null,
            registerDate: null,
            job: null,
            authorization: null
        };

        vm.login = loginFn;

        if (UserService.isLogined()) {
            $location.path("/");
        }

        $(document).ready(function () {
            $('input').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%' /* optional */
            });
        });

        function loginFn() {
            let email = $scope.email;
            let password = $scope.password;
            let credentials = {
                email,
                password
            }

            var headers = credentials ?
                {
                    authorization: "Basic " + btoa(credentials.email + ":" + credentials.password)
                }
                : {};
            $http.defaults.headers.common['Authorization'] = headers.authorization;
            $http.post('http://localhost:8080/user').then(function success(response) {
                console.log(response.data.name);
                if (response.data.name) {
                    vm.userData.name = response.data.name;
                    vm.userData.authorization = headers.authorization
                    UserService.login(vm.userData);
                } else {
                    vm.userData.name = null;
                }
            }, function error(error) {
                console.log("error", error);
            });
        }
    }
})();
