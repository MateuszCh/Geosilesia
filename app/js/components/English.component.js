/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */
(function(){
    angular.module('geosilesia').component('english', {
        templateUrl: 'html/views/english.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: EnglishController
    });

    EnglishController.$inject = [];

    function EnglishController(){
        var vm = this;
    }
})();
