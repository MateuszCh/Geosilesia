/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */
(function(){
    angular.module('geosilesia').component('homepage', {
        templateUrl: 'html/views/homepage.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: HomepageController
    });

    HomepageController.$inject = ['$http'];

    function HomepageController($http){
        var vm = this;
        vm.markers = [];
        vm.$onInit = onInit;
        function onInit(){
            $http.get("json/markers.json").then(function (response) {
                vm.markers = response.data.obiekty;
                console.log(vm.markers);
            })
        }
    }
})();
