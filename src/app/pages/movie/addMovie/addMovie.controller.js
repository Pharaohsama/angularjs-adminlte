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
            url: '/addmovie',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/movie/addMovie/addMovie.html',
                    controller: ControllerFn,
                    controllerAs: 'vmMovie'
                }
            }
        });
    }

    ControllerFn.$inject = ["UserService", "$location", "$scope", "$http"];

    /**
     * Controller Function
     *
     * @constructor
     */
    function ControllerFn(UserService, $location, $scope, $http) {
        var vm = this;
        $scope.file = null;
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
            format: "yyyy-mm-dd",
            autoclose: true
        })

        $scope.postData = function (title, description, duration, release, na, dir, actors, genres, pos) {
            var dataForm = new FormData();
            var data = {
                title: title,
                description: description,
                durationInMin: duration,
                releaseDate: $('#datepicker').val(),
                nationality: $('#nationality').val(),
                director: $('#director').val(),
                actors: $('#actors').val(),
                genres: $('#genres').val(),
                poster: file.files[0],
            }

            data.nationality = data.nationality[0];

            data.director = data.director[0];

            data.actors = data.actors.map(actorId => Number(actorId));

            data.genres = data.genres.map(genreId => Number(genreId));

            console.log(data.releaseDate);

            dataForm.append("title", data.title);
            dataForm.append("description", data.description);
            dataForm.append("durationInMin", data.durationInMin);
            dataForm.append("releaseDate", data.releaseDate);
            dataForm.append("nationality", data.nationality);
            dataForm.append("director", data.director);
            dataForm.append("actors", data.actors);
            dataForm.append("genres", data.genres);
            dataForm.append("poster", data.poster);

            console.log(JSON.stringify(data));
            $http.post("http://localhost:8080/api/movies", dataForm, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .then(function success(response) {
                        console.log(response);
                        $location.path('/listmovie');
                    }
                    , function error(response) {
                        console.log(response);
                    }
                )
        }
        $('.select2').select2()
    }
})();
