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
        $stateProvider.state('app.editArtist', {
            url: '/editArtist/:id',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/artist/artistEdit/artistEdit.html',
                    controller: ControllerFn,
                    controllerAs: 'vmArtistEdit'
                }
            }
        });
    }

    /**
     * Controller Function
     *
     * @constructor
     */
    function ControllerFn($scope, $http, $location,$stateParams) {
        var vm = this;

        $scope.name = null;
        $scope.type= null;
        $scope.success = false;
        $scope.error = false;
        $scope.n = null;
        $scope.allNationalities = [];
        //this the usage of stateParams
        var artistId = $stateParams.id;
        console.log(artistId);
        $scope.getData = () => {
            $http.get("http://localhost:8080/api/nationalities")
                .then(function success(response) {
                    $scope.allNationalities = response.data;
                    console.log($scope.allNationalities);
                }),
            $http.get("http://localhost:8080/api/artists/" +artistId)
                .then(function success(response){
                    $scope.name = response.data.name;
                    console.log($scope.name);
                })
        }

        $scope.patchData = function (name,type,n) {
            //creating object to pass data to the srvice
            var data = {
                id: artistId,
                name: name,
                type: type,
                nationality : n,
            }
            $http.patch("http://localhost:8080/api/artists/"+artistId, JSON.stringify(data))
                .then(function success(response) {
                        console.log(response);
                        $scope.name = null;
                        $scope.success = true;
                        $scope.error = false;
                        $scope.getData();
                        $location.path('/allartist');
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


