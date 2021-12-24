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
        $stateProvider.state('app.editNationality', {
            url: '/editNationality/:id',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/nationality/nationalityEdit/nationalityEdit.html',
                    controller: ControllerFn,
                    controllerAs: 'vmNationalityEdit'
                }
            }
        });
    }

    /**
     * Controller Function
     *
     * @constructor
     */
    function ControllerFn($scope, $http, $stateParams,$location) {
        var vm = this;
        $scope.name = null;
        $scope.id = null;
        $scope.success = false;
        $scope.error = false;
        var nationalityId =  $stateParams.id;

        $scope.getData = () => {
            $http.get("http://localhost:8080/api/nationalities/"+nationalityId)
                .then(function success(response) {
                    $scope.name = response.data.name;
                    console.log($scope.name);
                })
        }
        $scope.patchData = function (name) {
            //creating object to pass data to the srvice
            var data = {
                id: nationalityId,
                name: name,
            }
            $http.patch("http://localhost:8080/api/nationalities/"+nationalityId, JSON.stringify(data))
                .then(function success(response) {
                        console.log(response);
                        $scope.name = null;
                        $scope.success = true;
                        $scope.error = false;
                        $scope.getData();
                        $location.path('/nationality');
                    }
                    , function error(response) {
                        console.log(response);
                        $scope.name = null;
                        $scope.error = true;
                        $scope.success = false;
                    }
                )
        }
        $scope.getData();

    }
})();
