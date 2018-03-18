(function(){
    angular.module('frodo').component('toolbar', {
        templateUrl: 'html/components/layout/toolbar.html',
        controllerAs: 'vm',
        controller: ToolbarController
    });

    ToolbarController.$inject = ['$mdSidenav'];
    function ToolbarController($mdSidenav){
        var vm  = this;
        vm.$onInit = onInit;

        function onInit(){

        }

        vm.toggleSidenav = toggleSidenav;

        function toggleSidenav(){
            $mdSidenav('sidenav').toggle();
        }

    }
})();