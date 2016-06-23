(function () {
    'use strict';

    angular.module('app').config(routerConfig);

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '',
                abstract: true,
                views: {
                    'header@': {
                        templateUrl: 'app/header.html',
                        controller: 'HeaderController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('scoreboard', {
                parent: 'app',
                url: '/scores',
                views: {
                    'content@': {
                        templateUrl: 'app/scoreboard.html',
                        controller: 'ScoreboardController',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/scores');
    }
})();
