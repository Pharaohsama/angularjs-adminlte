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
        $stateProvider.state('app.sessionEdit', {
            url: '/sessionEdit/:id',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/session/sessionEdit/sessionEdit.html',
                    controller: ControllerFn,
                    controllerAs: 'vmSessionEdit'
                }
            }
        });
    }

    /**
     * Controller Function
     *
     * @constructor
     */
    function ControllerFn($scope, $http,$stateParams, $location) {
        var vm = this;
        $scope.all = [];
        $scope.movie = null;
        $scope.start = null;
        $scope.selectedMovie = {};
        //for recuting the session id
        var sessionId = $stateParams.id;
        //for getting the movies
        $scope.getData = () => {
            $http.get("http://localhost:8080/api/movies")
                .then(function success(response) {
                    $scope.allMovies = response.data;
                    console.log($scope.allMovies);
                });

            //for getting the theaters
            $http.get("http://localhost:8080/api/theaters")
                .then(function success(response) {
                    $scope.allTheaters = response.data;
                    console.log($scope.allTheaters);
                });
            $http.get("http://localhost:8080/api/sessions/"+sessionId)
                .then(function success(response){
                    $scope.session=response.data;
                    console.log($scope.session);
                })
        }
        $scope.getData();

        $('#datepicker').datepicker({
            format: "yyyy-mm-dd",
            autoclose: true
        })
        //for the end of the session
        $scope.timeSession = function () {
            // alert($('#timeId').val());
            var hour = $('#timeId').val();

            console.log($scope.selectedMovie)

            var min = HtoM(hour) + ($scope.selectedMovie.durationInMin);
            $scope.endSession = MtoH(min);
        }

        function HtoM(hour) {
            var timeParts = hour.split(":");
            return Number(timeParts[0]) * 60 + Number(timeParts[1]);
        }

        function MtoH(min) {

            var h = (Math.floor(min / 60)) % 24;
            var m = min % 60;
            h = h < 10 ? '0' + h : h; // (or alternatively) h = String(h).padStart(2, '0')
            m = m < 10 ? '0' + m : m; // (or alternatively) m = String(m).padStart(2, '0')
            return `${h}:${m}`;
        }


        $scope.patchData = function (sessionDate, theater, startTime, endSession) {
            //creating object to pass data to the srvice
            var data = {
                id: sessionId,
                sessionDate: $('#datepicker').val(),
                startTime: $('#timeId').val(),
                endTime: endSession,
                movie: $scope.selectedMovie.id,
                theater: Number(theater)
            }
            $http.patch("http://localhost:8080/api/sessions/" + sessionId, JSON.stringify(data))
                .then(function success(response) {
                        console.log(response);
                        $scope.startTime = null;
                        $scope.success = true;
                        $scope.error = false;
                        $scope.getData();
                        $location.path('/listSession');
                    }
                    , function error(response) {
                        console.log(response);
                        $scope.startTime = null;
                        $scope.error = true;
                        $scope.success = false;
                    }
                )
        }
        $scope.getData();


        //jquery for getting the movie selected from the select options
        $('#select-movie').change(() => {
            let data = $('#select-movie option:selected').val();
            $scope.selectedMovie = JSON.parse(data);
            console.log($scope.selectedMovie.id)
        });
    }



})();
