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
        $stateProvider.state('app.addMovie', {
            url: '/movie',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/movie/addMovie/addMovie.html',
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
        $scope.allNationalities = [];
        $scope.getData = () => {
            $http.get("http://localhost:8080/api/nationalities")
                .then(function success(response) {
                    $scope.allNationalities = response.data;
                    console.log($scope.allNationalities);
                })
            $http.get("http://localhost:8080/api/artists/directors")
                .then(function success(response) {
                    $scope.allDirectors = response.data;
                    console.log($scope.allDirectors);
                })
            $http.get("http://localhost:8080/api/artists/actors")
                .then(function success(response) {
                    $scope.allActors = response.data;
                    console.log($scope.allActors);
                })
            $http.get("http://localhost:8080/api/genres")
                .then(function success(response) {
                    $scope.allGenres = response.data;
                    console.log($scope.allGenres);
                })
        }
        $scope.getData();
        $('#datepicker').datepicker({
            autoclose: true
        })
        $scope.postData = function (title, description, duration, release, na, dir, actors, genres, pos) {
            var data = {
                title: title,
                description: description,
                durationInMin: duration,
                releaseDate: release,
                nationality: $('#nationality').val(),
                director: $('#director').val(),
                actors: $('#actors').val(),
                genres: $('#genres').val(),
                // poster: pos,
            }
            console.log(JSON.stringify(data));
            $http.post("http://localhost:8080/api/movies", data, {transformRequest: angular.identity,headers: {'Content-Type': undefined}})
                .then(function success(response) {
                        console.log(response);
                    }
                    , function error(response) {
                        console.log(response);
                    }
                )
        }
        $('.select2').select2()
    }
})();
