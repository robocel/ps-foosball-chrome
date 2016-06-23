(function () {
    'use strict';

    angular.module('app').factory('PlayerService', PlayerService);

    PlayerService.$inject = ['$http'];

    function PlayerService($http) {

        var URL_GET_PLAYERS = 'https://ps-foosball.mybluemix.net/api/Teams?filter[where][type]=singles&filter[where][rank][gte]=1&filter[order]=rank%20ASC';
        var API_KEY = 't0ddsucks';

        return {
            getAllPlayers: getAllPlayers
        };

        function getAllPlayers() {
            return $http(getHttpConfig(URL_GET_PLAYERS)).then(
                function (response) {
                    return parsePlayers(response.data);
                },
                function (err) {
                    return [];
                }
            );
        }

        function parsePlayers(players) {
            var parsedPlayers = [];
            for (var i = 0; i < players.length; i++) {
                var playerToParse = players[i];
                var parsedPlayer = {
                    id: playerToParse.id,
                    name: playerToParse.name
                };
                parsedPlayers.push(parsedPlayer);
            }
            return parsedPlayers;
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