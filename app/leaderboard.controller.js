(function() {
    'use strict';

    angular.module('app').controller('LeaderboardController', LeaderboardController);

    LeaderboardController.$inject = ['PlayerService'];

    function LeaderboardController(PlayerService) {
        var vm = this;

        vm.players = [];

        init();

        function init() {
            PlayerService.getAllPlayers().then(
                function (players) {
                    vm.players = players;
                }
            );
        }
    }

})();