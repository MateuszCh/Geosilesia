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
    HeaderController.$inject = ['$window'];
    function HeaderController($window){

        var vm = this;
        vm.$onInit = onInit;
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

        function onInit(){
            $window.addEventListener('resize', resetHeader);
            if($window.innerWidth > 768){
                vm.hamOpen = true;
            }
        }

        vm.hamOpen = false;
        vm.openHam = openHam;

        function openHam() {
            return vm.hamOpen ? vm.hamOpen = false : vm.hamOpen = true;
        }
        var previousSize;
        function resetHeader(){
            vm.hamOpen = false;
            var currentSize = $window.innerWidth;
            if((previousSize <= 768 && currentSize > 768) || (previousSize <= 1200 && currentSize > 1200)){
                vm.openHam = true;
            }
        }
    }
})();


// $(window).on("resize", function () {
//     sizeOfHeader = $("header").height();
//     var currentSize = window.innerWidth;
//     if((previousSize <= 768 && currentSize > 768) || (previousSize <= 1200 && currentSize > 1200)){
//         if($(mainNav).css("display")){
//             $(geoSlaskNav).slideUp(0);
//             $(mainNav).attr("style", " ");
//         }
//         if($(geoSlaskNav).css("display")){
//             $(geoSlaskNav).attr("style", " ");
//         }
//         if($(menuHam).hasClass("expanded")){
//             $(menuHam).removeClass("expanded");
//         }
//     }
//     previousSize = currentSize;
// });