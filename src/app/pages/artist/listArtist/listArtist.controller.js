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
    function ControllerFn($scope, $http,$state) {
        var vm = this;

        $scope.name = null;
        $scope.type = null;
        $scope.nationality = null;
        $scope.success = false;
        $scope.error = false;
        $scope.allArtists = [];
        $scope.artist = []
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
        $scope.artist = $scope.id;
        $scope.artist = $scope.name;
        $scope.artist = $scope.type;
        $scope.artist = $scope.nationality;
        //this is for deleting
        $scope.deleteData = (data) => {
            $http.delete("http://localhost:8080/api/artists/" +data, JSON.stringify(data))
                .then(function (response) {
                    console.log(response);
                   $scope.getData();
                });
        }
        //this is for editing
        $scope.editData = (data) =>{
            $state.go("app.editArtist",{id: data});
            //we use state to redirect and send data to another page
        }


        function initialiseTable() {

            let table = $(document).ready(function () {
                $scope.table = $('#anassData').DataTable({
                    data: $scope.allArtists,
                    columns: [
                        {"data": "id"},
                        {"data": "name"},
                        {"data": "type"},
                        {"data": "nationality.name"},
                        {   "data" : "id",
                            render: function (data) {
                                return '<button  class="btn btn-primary" onclick="angular.element(this).scope().editData('+ data +')"><i class="fa fa-edit"/></button>';
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
