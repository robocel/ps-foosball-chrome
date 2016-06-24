(function() {
    'use strict';

    angular.module('app').controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$state', '$scope', '$rootScope'];

    function HeaderController($state, $scope, $rootScope) {
        var vm = this;

        vm.isOnScoreboard = false;
        vm.isOnHeadToHead = false;
        vm.isOnLeaderboard = false;

        init();

        function init() {
            $scope.$on('$destroy', $rootScope.$on('$stateChangeSuccess', updateStates));
            updateStates();
        }

        function updateStates() {
            vm.isOnScoreboard = $state.current.name === 'scoreboard';
            vm.isOnHeadToHead = $state.current.name === 'headtohead';
            vm.isOnLeaderboard = $state.current.name === 'leaderboard';
        }
    }
})();