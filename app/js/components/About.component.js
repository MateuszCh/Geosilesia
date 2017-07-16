/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */
(function(){
    angular.module('geosilesia').component('about', {
        templateUrl: 'html/views/about.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: AboutController
    });

    AboutController.$inject = [];

    function AboutController(){
        var vm = this;
    }
})();
