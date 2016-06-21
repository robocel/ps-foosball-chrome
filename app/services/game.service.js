(function() {
    'use strict';

    angular.module('app').factory('GameService', GameService);

    GameService.$inject = ['$http'];

    function GameService($http) {
        var URL_TODAYS_GAMES = 'https://ps-foosball.mybluemix.net/api/Games?filter[where][status]=complete&filter[include]=team0&filter[include]=team1&filter[where][startTime][gt]=';
        var URL_ACTIVE_GAME = 'https://ps-foosball.mybluemix.net/api/Games?filter[where][status]=active&filter[include]=team0&filter[include]=team1';
        //var URL_ACTIVE_GAME = 'https://ps-foosball.mybluemix.net/api/Games/5767fe87607b931d002dad6d?filter[include]=team0&filter[include]=team1';
        var API_KEY = 't0ddsucks';

        return {
            getActiveGame: getActiveGame,
            getTodaysGames: getTodaysGames
        };

        function getActiveGame() {
            var httpConfig = getHttpConfig(URL_ACTIVE_GAME);
            return $http(httpConfig).then(
                function (response) {
                    // TODO [RWO] - Do some data processing here
                    return response.data;
                },
                function (err) {
                    return [];
                }
            )
        }

        function getTodaysGames() {
            var url = URL_TODAYS_GAMES + getTodaysUnixTime();
            var httpConfig = getHttpConfig(url);
            return $http(httpConfig).then(
                function (response) {
                    // TODO [RWO] - Do some data processing here
                    return response.data;
                },
                function (err) {
                    // Default to swallowing errors and simply showing nothing
                    return [];
                }
            );
        }

        function getTodaysUnixTime() {
            var now = new Date();
            var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return startOfDay.getTime();
        }

        function getHttpConfig(url) {
            return {
                method: 'GET',
                url: url,
                headers: {
                    'x-ps-simple-auth': API_KEY,
                }
            };
        }
    }
})();