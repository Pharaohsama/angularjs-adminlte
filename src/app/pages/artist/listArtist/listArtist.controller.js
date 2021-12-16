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
        $stateProvider.state('app.allartist', {
            url: '/allartist',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/artist/listArtist/listArtist.html',
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
    function ControllerFn($scope, $http) {
        var vm = this;

        $scope.name = null;
        $scope.type= null;
        $scope.nationality = null;
        $scope.success = false;
        $scope.error = false;
        $scope.allArtists = [];
        $scope.table = initialiseTable();
        $scope.getData = () => {
            $http.get("http://localhost:8080/api/artists")
                .then(function success(response) {
                    $scope.allArtists = response.data;
                    $scope.table.destroy();
                    initialiseTable();
                    console.log($scope.allArtists);
                })
        }


        $scope.getData();

        function initialiseTable() {
            let table = $(document).ready(function () {
                $scope.table = $('#artistsData').DataTable({
                    data: $scope.allArtists,
                    columns: [
                        {"data": "id"},
                        {"data": "name"},
                        {"data": "type"},
                        {"data": "nationality.name"},


                    ]
                });
            });
            return table;
        }
    }

})();
