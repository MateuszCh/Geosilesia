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
    HeaderController.$inject = ['$scope'];
    function HeaderController(){

        var vm = this;
        vm.nav = [
            {title: 'O serwisie', link: '/o-nas'},
            {title: 'Geośląsk', submenu : [
                {title: 'Położenie', link : '/polozenie'},
                {title: 'Rzeźba terenu', link: '/rzezba'},
                {title: 'Budowa geologiczna', link: '/budowa'},
                {title: 'Geostanowiska', link: '/geostanowiska'},
                {title: 'Atakcje geoturystyczne', link: '/atrakcje'}
            ]},
            {title: 'Wydarzenia', link: '/wydarzenia'},
            {title: 'Słownik', link: '/slownik'},
            {title: 'Galeria', link: '/galeria'},
            {title: 'English', link: '/english'}
        ];




    }
})();