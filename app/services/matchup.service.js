(function() {
    'use strict';

    angular.module('app').factory('MatchupService', MatchupService);

    MatchupService.$inject = ['$http', 'API_KEY'];

    function MatchupService($http, API_KEY) {

        var URL_GET_GAMES = 'https://ps-foosball.mybluemix.net/api/Games?filter=';

        return {
            getMatchupRecord: getMatchupRecord
        };

        function getMatchupRecord(team0Id, team1Id) {
            var url = URL_GET_GAMES + buildQueryString(team0Id, team1Id);
            console.log(url);
            var httpConfig = getHttpConfig(url);
            return $http(httpConfig).then(
                function (response) {
                    return parseMatchup(response.data, team0Id, team1Id);
                },
                function (err) {
                    return [];
                }
            );
        }

        function parseMatchup(games, team0Id, team1Id) {
            var team0Wins = 0;
            var team0Goals = 0;
            var team1Wins = 0;
            var team1Goals = 0;

            for (var i = 0; i < games.length; i++) {
                var game = games[i];

                if (game.team0Id === team0Id) {
                    if (game.team0Score === 10) {
                        team0Wins++;
                    } else {
                        team1Wins++;
                    }
                    team0Goals += game.team0Score;
                    team1Goals += game.team1Score;
                } else {
                    if (game.team0Score === 10) {
                        team1Wins++;
                    } else {
                        team0Wins++;
                    }
                    team0Goals += game.team1Score;
                    team1Goals += game.team0Score;
                }
            }

            return {
                team0Wins: team0Wins,
                team0Goals: team0Goals,
                team1Wins: team1Wins,
                team1Goals: team1Goals
            };
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

        function buildQueryString(team0Id, team1Id) {
            var query = {
                where: {
                    and: [
                        {
                            or: [
                                {
                                    and: [
                                        {team0Id: team0Id},
                                        {team1Id: team1Id}
                                    ]
                                },
                                {
                                    and: [
                                        {team0Id: team1Id},
                                        {team1Id: team0Id}
                                    ]
                                }
                            ]
                        },
                        {
                            or: [
                                {status: 'force-complete'},
                                {status: 'complete'},
                                {status: 'force-completed'}
                            ]
                        }
                    ]
                }
            };

            return JSON.stringify(query);
        }
    }
})();