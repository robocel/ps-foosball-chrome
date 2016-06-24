(function() {
    'use strict';

    angular.module('app').factory('GameService', GameService);

    GameService.$inject = ['$http', 'API_KEY'];

    function GameService($http, API_KEY) {
        var URL_TODAYS_GAMES = 'https://ps-foosball.mybluemix.net/api/Games?filter[where][status]=complete&filter[include]=team0&filter[include]=team1&filter[where][startTime][gt]=';
        var URL_ACTIVE_GAME = 'https://ps-foosball.mybluemix.net/api/Games?filter[where][status]=active&filter[include]=team0&filter[include]=team1';
        //var URL_ACTIVE_GAME = 'https://ps-foosball.mybluemix.net/api/Games/5767fe87607b931d002dad6d?filter[include]=team0&filter[include]=team1';
        var URL_GAME_SCORES = 'https://ps-foosball.mybluemix.net/api/Scores/?filter[order]=timestamp%20ASC&filter[where][gameId]=';

        return {
            getActiveGame: getActiveGame,
            getTodaysGames: getTodaysGames,
            getScoresForGame: getScoresForGame
        };

        function getActiveGame() {
            var httpConfig = getHttpConfig(URL_ACTIVE_GAME);
            return $http(httpConfig).then(
                function (response) {
                    // TODO [RWO] - Do some data processing here
                    if (response.data.length) {
                        return response.data[0];
                    } else {
                        return {};
                    }
                },
                function (err) {
                    return {};
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

        function getScoresForGame(gameId, startTime) {
            var url = URL_GAME_SCORES + gameId;
            var httpConfig = getHttpConfig(url);
            return $http(httpConfig).then(
                function (response) {
                    return processScores(response.data, startTime);
                },
                function (err) {
                    // Default to swallowing errors and simply showing nothing
                    return [];
                }
            )
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

        function processScores(scores, gameStart) {
            var scoreEntries = [];
            var team0Score = 0;
            var team1Score = 0;

            for (var i = 0; i < scores.length; i++) {
                var currentScore = scores[i];

                if (currentScore.teamIndicator === 0) {
                    team0Score += currentScore.value;
                } else {
                    team1Score += currentScore.value;
                }

                var scoreEntry = {
                    scoringTeam: currentScore.teamIndicator,
                    team0Score: team0Score,
                    team1Score: team1Score,
                    timestamp: moment(currentScore.timestamp).diff(gameStart)
                };

                console.log(JSON.stringify(scoreEntry, 0, 2));
                scoreEntries.push(scoreEntry);
            }

            return scoreEntries;
        }
    }
})();