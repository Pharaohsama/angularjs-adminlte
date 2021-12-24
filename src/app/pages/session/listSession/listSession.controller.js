(function(){
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
    function configFn($stateProvider){
        $stateProvider.state('app.listSession',{
            url:'/listSession',
            views :{
                'content@app':{
                    templateUrl:'app/pages/session/listSession/listSession.html',
                    controller : ControllerFn,
                    controllerAs : 'vmSession'
                }
            }
        });
    }

    /**
     * Controller Function 
     * 
     * @constructor
     */
    function ControllerFn($scope,$http,$state){
        var vm = this;
        $scope.movie = null;
        $scope.duration = null
        $scope.theater = null;
        $scope.startTime = null;
        $scope.endTime = null;
        $scope.allSession = [];
        $scope.table = initialiseTable();
        $scope.getData =() =>{
            $http.get("http://localhost:8080/api/sessions")
                .then(function seccess(response){
                    $scope.allSession = response.data;
                    $scope.table.destroy();
                    initialiseTable();
                    console.log($scope.allSession);

            })
        }
         $scope.getData();
        //for deleting
        $scope.deleteData = (data) => {
            $http.delete("http://localhost:8080/api/sessions/" +data,JSON.stringify(data))
                .then(function (response){
                    console.log(response);
                    $scope.getData();
                });
        }
        //for editing
        $scope.editData = (data) => {
            $state.go("app.sessionEdit", {id:data});
            //in this function we just redirect


        }

        function initialiseTable(){
            let table = $(document).ready(function (){
                $scope.table =$('#sessionData').DataTable({
                    data:$scope.allSession,
                    columns :[
                        {"data" : "id"},
                        {"data" : "sessionDate"},
                        {"data" : "movie.title"},
                        {"data" : "movie.durationInMin"},
                        {"data" : "theater.name"},
                        {"data" : "startTime"},
                        {"data" : "endTime"},
                        {
                            "data": "id",
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

        }

    }
})();