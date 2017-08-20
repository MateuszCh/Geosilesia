(function(){
    angular.module('geosilesia').component('header', {
        templateUrl: 'html/layout/header.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: HeaderController
    });
    HeaderController.$inject = ['$window', '$location', '$scope', '$timeout', '$element'];
    function HeaderController($window, $location, $scope, $timeout, $element){

        var vm = this;
        vm.$onInit = onInit;
        vm.openHam = openHam;
        vm.checkGeo = checkGeo;
        vm.hamOpen = false;
        vm.activeGeo = false;
        var previousScroll = 0;

        vm.nav = [
            {title: 'O serwisie', link: '/o-nas'},
            {title: 'Geośląsk', submenu : [
                {subtitle: 'Położenie', link : '/polozenie'},
                {subtitle: 'Rzeźba terenu', link: '/rzezba'},
                {subtitle: 'Budowa geologiczna', link: '/budowa'},
                {subtitle: 'Geostanowiska', link: '/geostanowiska'},
                {subtitle: 'Atakcje geoturystyczne', link: '/atrakcje'}
            ]},
            {title: 'Wydarzenia', link: '/wydarzenia'},
            {title: 'Słownik', link: '/slownik'},
            {title: 'Galeria', link: '/galeria'},
            {title: 'English', link: '/english'}
        ];

        function onInit(){
            $window.addEventListener('resize', resetHeader);
            $scope.$on("$routeChangeSuccess", setCurrentPath);
            $window.addEventListener('scroll', hideHeader);
        }

        function setCurrentPath() {
            vm.currentPath = $location.path();
            if(vm.currentPath === '/'){
                vm.activeGeo = false;
                vm.hamOpen = false;
            }
            var counter = 0, i, position;
            for(i = 0; i < vm.currentPath.length; i++){
                if(vm.currentPath[i] === '/'){
                    counter++;
                    if(counter === 2){
                        position = i;
                    }
                }
            }
            if(counter === 2){
                vm.currentPath = vm.currentPath.substr(0, position);
            }
        }

        function openHam() {
            return vm.hamOpen ? vm.hamOpen = false : vm.hamOpen = true;
        }

        function checkGeo(link) {
            vm.activeGeo = link.subtitle;
        }

        function resetHeader(){
            vm.hamOpen = false;
            vm.noTransition = true;
            $timeout(function(){
                vm.noTransition = false;
            }, 500);
        }
        function hideHeader(){
            var currentScroll = $window.scrollY;
            var heightOfHeader = document.getElementById('header').offsetHeight;
            if(previousScroll < currentScroll){
                vm.hideHeader = true;
                $element.children().addClass('header--hidden');
            } else if(previousScroll > currentScroll && (!document.getElementById('search') || currentScroll < $window.innerHeight - heightOfHeader)) {
                vm.hideHeader = false;
            }
            previousScroll = currentScroll;
        }
    }
})();
