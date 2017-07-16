/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */
(function(){
    angular.module('geosilesia').component('dictionary', {
        templateUrl: 'html/views/dictionary.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: DictionaryController
    });

    DictionaryController.$inject = [];

    function DictionaryController(){
        var vm = this;
    }
})();
