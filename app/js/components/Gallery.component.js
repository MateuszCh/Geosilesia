/**
 * Created by Mateusz Chybiorz on 2017-07-23.
 */
(function(){
    angular.module('geosilesia').component('gallery', {
        templateUrl: 'html/views/gallery.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: GalleryController
    });

    GalleryController.$inject = ['$http'];

    function GalleryController($http){
        var vm = this;
        vm.galleries = [];
        vm.$onInit = onInit;

        function onInit() {
            $http.get("json/gallery.json").then(function (response) {
                vm.galleries = response.data.gallery;
            });
        }
    }
})();