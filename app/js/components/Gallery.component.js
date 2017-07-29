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

    GalleryController.$inject = ['$http', '$routeParams'];

    function GalleryController($http, $routeParams){
        var vm = this;
        vm.$onInit = onInit;
        vm.showFullMode = false;

        function onInit() {
            $http.get("json/galleries/" + $routeParams.galleryId + ".json").then(function (gallery) {
                vm.gallery = gallery.data;
            });
        }
    }
})();