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
            })
            .state('headtohead', {
                parent: 'app',
                url: '/headtohead',
                views: {
                    'content@': {
                        templateUrl: 'app/headtohead.html',
                        controller: 'HeadToHeadController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('leaderboard', {
                parent: 'app',
                url: '/leaderboard',
                views: {
                    'content@': {
                        templateUrl: 'app/leaderboard.html',
                        controller: 'LeaderboardController',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/scores');
    }
})();
