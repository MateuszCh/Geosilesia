(function(){
    angular.module('frodo').component('pageBody', {
        templateUrl: 'html/components/page-body.html',
        controllerAs: 'vm',
        controller: PageBodyController
    });

    PageBodyController.$inject = ['$mdSidenav', '$timeout', '$transitions', '$window', 'tools', '$scope', '$document', '$mdMedia', '$state'];
    function PageBodyController($mdSidenav, $timeout, $transitions, $window, tools, $scope, $document, $mdMedia, $state){
        var vm  = this;
        vm.$onInit = onInit;
        vm.$mdMedia = $mdMedia;
        vm.openSidenav = openSidenav;
        vm.openFilters = openFilters;

        var throttledOnScroll = tools.throttle(onScroll, 100);

        function onInit(){
            $transitions.onSuccess({}, function(){
                $timeout(closeSidenav, 150);
                // $window.scrollTo(0,0);
                if(window.pageYOffset > 0) $document.scrollTop(0, 100);
            });
            $window.addEventListener('scroll', throttledOnScroll);
        }

        function onScroll(){
            vm.scrolled = window.pageYOffset > 0;
            $scope.$apply();
        }

        function openSidenav(){
            $mdSidenav('sidenav').open();
        }

        function closeSidenav(){
            $mdSidenav('sidenav').close();
        }

        function openFilters(){
            if($state.current.name === 'posts'){
                $mdSidenav('filters').open();
            }
        }
    }
})();