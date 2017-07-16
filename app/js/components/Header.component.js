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
    }
})();
