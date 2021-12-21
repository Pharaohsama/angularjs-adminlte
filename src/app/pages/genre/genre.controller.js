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
        $stateProvider.state('app.genre', {
            url: '/genre',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/genre/genre.html',
                    controller: ControllerFn,
                    controllerAs: 'vmGenre'
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
        $scope.allGenres = [];
        $scope.table = initialiseTable();

        $scope.getData = () => {
            $http.get("http://localhost:8080/api/genres")
                .then(function success(response) {
                    $scope.allGenres = response.data;
                    $scope.table.destroy();
                    initialiseTable();
                    console.log($scope.allGenres);
                })
        }
        $scope.postData = function (name) {
            //creating object to pass data to the service
            var data = {
                name: name,
            }

            $http.post("http://localhost:8080/api/genres", JSON.stringify(data))
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
        $scope.deleteData = (data) => {
            $http.delete("http://localhost:8080/api/genres/" +data, JSON.stringify(data))
                .then(function (response) {
                    console.log(response);
                    $scope.getData();
                });
        }

        function initialiseTable() {
            let table = $(document).ready(function () {
                $scope.table = $('#genreData').DataTable({
                    data: $scope.allGenres,
                    columns: [
                        {"data": "id"},
                        {"data": "name"},
                        {   "data" : "id",
                            render: function () {
                                return '<button  class="btn btn-primary" onclick="$scope.deleteData(${data})"><i class="fa fa-edit"/></button>';
                            }
                        },
                        {   "data" : "id",
                            render: function (data) {
                                return '<button  class="btn btn-primary" onclick="angular.element(this).scope().deleteData('+data+')"><i class="fa fa-trash"/></button>';
                            }
                        }
                    ]
                });
            });
            return table;
            var editor; // this one to make the table editable

            $(document).ready(function () {
                editor = new $.fn.dataTable.Editor({
                    "table": "table",
                })
            })
        }
    }
})();

