(function() {
    'use strict';

    angular.module('app').controller('HeadToHeadController', HeadToHeadController);

    HeadToHeadController.$inject = ['MatchupService', 'PlayerService'];

    function HeadToHeadController(MatchupService, PlayerService) {
        var vm = this;

        vm.player0;
        vm.player1;
        vm.matchupData = {};
        vm.players = [];

        vm.onPlayerChange = onPlayerChange;

        init();

        function init() {
            PlayerService.getAllPlayers().then(
                function (players) {
                    vm.players = players;
                }
            );
        }

        function onPlayerChange() {
            if (vm.player0 && vm.player1) {
                MatchupService.getMatchupRecord(vm.player0.id, vm.player1.id).then(
                    function (matchup) {
                        vm.matchupData = matchup;
                    }
                )
            } else {
                vm.matchupData = {};
            }
        }
    }

})();