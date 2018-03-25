(function(){
    angular.module('frodo').component('pageBody', {
        templateUrl: 'html/components/layout/page-body.html',
        controllerAs: 'vm',
        controller: PageBodyController
    });

    PageBodyController.$inject = ['$mdSidenav', '$timeout', '$transitions'];
    function PageBodyController($mdSidenav, $timeout, $transitions){
        var vm  = this;
        vm.$onInit = onInit;
        vm.openSidenav = openSidenav;

        function onInit(){
            $transitions.onSuccess({}, function(){
                $timeout(closeSidenav, 150);
            })
        }

        function openSidenav(){
            $mdSidenav('sidenav').open();
        }

        function closeSidenav(){
            $mdSidenav('sidenav').close();
        }
    }
})();