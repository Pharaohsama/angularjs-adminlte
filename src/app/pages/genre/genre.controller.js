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
    function ControllerFn($scope,$http) {
        var vm = this;
        $scope.name= null;
        $scope.postData = function (name){
            //creating object to pass data to the srvice
            var data ={
                name: name,
            }
            $http.post("http://localhost:8080/api/genres",JSON.stringify(data))
                .then(function (response) {
                    console.log(response);
                    
                })
        }


    }})();
