(function() {
    'use strict';

    angular.module('app')
        .controller('PopupController', PopupController);

    PopupController.$inject = ['GameService'];

    function PopupController(GameService) {
        var vm = this;

        vm.activeGame = {};
        vm.todaysGames = [];

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
    }
})();