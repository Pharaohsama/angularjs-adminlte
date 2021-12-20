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
        $stateProvider.state('app.artist', {
            url: '/artist',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/artist/addArtist/addArtist.html',
                    controller: ControllerFn,
                    controllerAs: 'vmArtist'
                }
            }
        });
    }

    /**
     * Controller Function
     *
     * @constructor
     */
    function ControllerFn($scope, $http, $location) {
        var vm = this;

        $scope.name = null;
        $scope.type= null;
        $scope.success = false;
        $scope.error = false;
        $scope.n = null;
        $scope.allNationalities = [];
        $scope.getData = () => {
            $http.get("http://localhost:8080/api/nationalities")
                .then(function success(response) {
                    $scope.allNationalities = response.data;
                    console.log($scope.allNationalities);
                })
        }

        $scope.postData = function (name,type,n) {
            //creating object to pass data to the service
            var data = {
                name: name,
                type: type,
                nationality : n ,
            }
            $http.post("http://localhost:8080/api/artists", JSON.stringify(data))
                .then(function success(response) {
                        console.log(response);
                        $scope.name = null;
                        $scope.success = true;
                        $scope.error = false;
                        $scope.getData();
                        $location.path('/allartist')
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


