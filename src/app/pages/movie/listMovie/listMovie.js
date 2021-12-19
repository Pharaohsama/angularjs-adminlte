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
        $stateProvider.state('app.listMovie', {
            url: '/listmovie',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/movie/listMovie/listMovie.html',
                    controller: ControllerFn,
                    controllerAs: 'vmMovie'
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
        $scope.director=null;
        $scope.duration=null;
        $scope.nationality = null;
        $scope.success = false;
        $scope.error = false;
        $scope.allArtists = [];
        $scope.table = initialiseTable();
        $scope.getData = () => {
            $http.get("http://localhost:8080/api/movies")
                .then(function success(response) {
                    $scope.allMovies = response.data;
                    $scope.table.destroy();
                    initialiseTable();
                    console.log($scope.allMovies);
                })
        }


        $scope.getData();

        function initialiseTable() {
            let table = $(document).ready(function () {
                $scope.table = $('#moviesData').DataTable({
                    data: $scope.allMovies,
                    columns: [
                        {"data": "id"},
                        {"data": "title"},
                        {"data": "durationInMin"},
                        {"data": "releaseDate"},
                        {"data": "director.name"},
                        {"data": "nationality.name"},
                        {"data": "description"},
                    ]
                });
            });
            return table;
        }
    }


})();
