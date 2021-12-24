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
        $stateProvider.state('app.editGenre', {
            url: '/editGenre/:id',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/genre/genreEdit/genreEdit.html',
                    controller: ControllerFn,
                    controllerAs: 'vmGenreEdit'
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
        var genreId =  $stateParams.id;

        $scope.getData = () => {
            $http.get("http://localhost:8080/api/genres/"+genreId)
                .then(function success(response) {
                    $scope.name = response.data.name;
                    console.log($scope.name);
                })
        }
        $scope.patchData = function (name) {
            //creating object to pass data to the srvice
            var data = {
                id: genreId,
                name: name,
            }
            $http.patch("http://localhost:8080/api/genres/"+genreId, JSON.stringify(data))
                .then(function success(response) {
                        console.log(response);
                        $scope.name = null;
                        $scope.success = true;
                        $scope.error = false;
                        $scope.getData();
                        $location.path('/genre');
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
