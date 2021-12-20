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
        $scope.delete = (data) => {
            console.log("it deleteing");

        }
        // Edit record
        $('table').on('click', 'td.editor-edit', function (e) {
            alert()
            console.log("this fucking works")

        });



        // Delete a record
        // $(delete(data)).on('click', 'td.editor-delete', function (e) {
        //     console.log("deleting ")

               // var data = { id: id,} ;
               // $http.post("http://localhost:8080/api/artists", JSON.stringify(data))
               //     .then(function success(response) {
               //             console.log(response);
               //             $scope.name = null;
               //             $scope.success = true;
               //             $scope.error = false;
               //             $scope.getData();
               //             $scope.table.destroy();
               //             initialiseTable();
               //         }
               //         , function error(response) {
               //             console.log(response);
               //             $scope.name = null;
               //             $scope.error = true;
               //             $scope.success = false;
               //         }
               //     )
            $scope.delete = function(data){
              alert()
            };



        function initialiseTable() {

            let table = $(document).ready(function () {
                $scope.table = $('#anassData').DataTable({
                    data: $scope.allArtists,
                    columns: [
                        {"data": "id"},
                        {"data": "name"},
                        {"data": "type"},
                        {"data": "nationality.name"},
                        {
                            "data ": "",
                            className: "dt-center editor-edit",
                            defaultContent: '<button type="button"  ><i class="fa fa-pencil"/></button>',
                            orderable: false
                        },
                        {
                            "data ": "",
                            className: "dt-center editor-delete",
                            defaultContent: "<button type='button' click={{delete(data)}}><i class='fa fa-trash'/></button>",
                            orderable: false
                        }





                    ]
                });



            });
            return table;
            var editor; // this one to make the table editable

            $(document).ready(function() {
                editor = new $.fn.dataTable.Editor( {
                    "table": "table",
        })
    })
        }
    }

})();
