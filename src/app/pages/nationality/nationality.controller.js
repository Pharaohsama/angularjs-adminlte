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
        $stateProvider.state('app.nationality', {
            url: '/nationality',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/nationality/nationality.html',
                    controller: ControllerFn,
                    controllerAs: 'vmNationality'
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
        $scope.allNationalities = [];
        $scope.table = initialiseTable();
        $scope.getData = () => {
            $http.get("http://localhost:8080/api/nationalities")
                .then(function success(response) {
                    $scope.allNationalities = response.data;
                    $scope.table.destroy();
                    initialiseTable();
                    console.log($scope.allNationalities);
                })
        }
        $scope.postData = function (name) {
            //creating object to pass data to the srvice
            var data = {
                name: name,
            }
            $http.post("http://localhost:8080/api/nationalities", JSON.stringify(data))
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
            $http.delete("http://localhost:8080/api/nationalities/" +data, JSON.stringify(data))
                .then(function (response) {
                    console.log(response);
                    $scope.getData();
                });
        }



        function initialiseTable() {
            let table = $(document).ready(function () {
                $scope.table = $('#natData').DataTable({
                    data: $scope.allNationalities,
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
