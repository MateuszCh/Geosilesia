(function(){
    angular.module('frodo').component('pageBody', {
        templateUrl: 'html/components/layout/page-body.html',
        controllerAs: 'vm',
        controller: PageBodyController
    });

    PageBodyController.$inject = ['$mdSidenav', '$scope', '$timeout', '$transitions'];
    function PageBodyController($mdSidenav, $scope, $timeout, $transitions){
        var vm  = this;
        vm.$onInit = onInit;

        function onInit(){
            $transitions.onSuccess({}, function(){
                $timeout(closeSidenav, 150);
            })
        }

        vm.openSidenav = openSidenav;
        vm.closeSidenav = closeSidenav;
        vm.toggleSidenav = toggleSidenav;

        function openSidenav(){
            $mdSidenav('sidenav').open();
        }

        function closeSidenav(){
            $mdSidenav('sidenav').close();
        }

        function toggleSidenav(){
            $mdSidenav('sidenav').toggle();

        }

    }
})();