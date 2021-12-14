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
        $stateProvider.state('app.theater', {
            url: '/movie',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/theater/theater.html',
                    controller: ControllerFn,
                    controllerAs: 'vmTheater'
                }
            }
        });
    }

    /**
     * Controller Function
     *
     * @constructor
     */
    function ControllerFn() {
        var vm = this;


    }})();
