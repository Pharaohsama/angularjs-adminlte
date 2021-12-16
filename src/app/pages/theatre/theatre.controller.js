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
        $stateProvider.state('app.theatre', {
            url: '/theatre',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/theatre/theatre.html',
                    controller: ControllerFn,
                    controllerAs: 'vmTheatre'
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
        $scope.success = false;
        $scope.error = false;
        $scope.allTheaters = [];
        $scope.table = initialiseTable();
        $scope.getData = () => {
            $http.get("http://localhost:8080/api/theaters")
                .then(function success(response) {
                    $scope.allTheatres = response.data;
                    $scope.table.destroy();
                    initialiseTable();
                    console.log($scope.allTheatres);
                })
        }
        $scope.postData = function (name) {
            //creating object to pass data to the service
            var data = {
                name: name,
            }
            $http.post("http://localhost:8080/api/theaters", JSON.stringify(data))
                .then(function success(response) {
                        console.log(response);
                        $scope.name = null;
                        $scope.success = true;
                        $scope.error = false;
                        $scope.getData();
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

        function initialiseTable() {
            let table = $(document).ready(function () {
                $scope.table = $('#theatreData').DataTable({
                    data: $scope.allTheatres,
                    columns: [
                        {"data": "id"},
                        {"data": "name"},
                    ]
                });
            });
            return table;
        }
    }
})();

