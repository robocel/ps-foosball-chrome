(function() {
    'use strict';

    angular.module('app')
        .controller('ScoreboardController', ScoreboardController);

    ScoreboardController.$inject = ['GameService'];

    function ScoreboardController(GameService) {
        var vm = this;

        vm.activeGame = {};
        vm.todaysGames = [];

        vm.toggleGame = toggleGame;

        init();

        function init() {
            GameService.getActiveGame().then(
                function (game) {
                    vm.activeGame = game;
                }
            );

            GameService.getTodaysGames().then(
                function (games) {
                    vm.todaysGames = games;
                }
            )
        }

        function toggleGame(game) {
            if (!game.toggled && !game.scores) {
                GameService.getScoresForGame(game.id, game.startTime).then(
                    function (scores) {
                        game.scores = scores;
                    }
                )
            }

            game.toggled = !game.toggled;
        }
    }
})();