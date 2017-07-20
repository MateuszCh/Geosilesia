/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */
(function(){
    angular.module('geosilesia').component('header', {
        templateUrl: 'html/header.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: HeaderController
    });
    HeaderController.$inject = ['$window', '$rootScope', '$location'];
    function HeaderController($window, $rootScope, $location){

        var vm = this;
        vm.$onInit = onInit;
        vm.hamOpen = false;
        vm.openHam = openHam;
        vm.activeGeo = false;
        vm.checkGeo = checkGeo;

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
            $rootScope.$on("$routeChangeSuccess", function(){
                vm.currentPath = $location.path();
            });
        }




        function openHam() {
            return vm.hamOpen ? vm.hamOpen = false : vm.hamOpen = true;
        }

        function checkGeo(link) {
            console.log(link);
            vm.activeGeo = link.subtitle;
            console.log(vm.activeGeo);
        }

        function resetHeader(){
            vm.hamOpen = false;
        }
    }
})();
