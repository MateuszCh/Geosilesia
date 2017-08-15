(function(){
    angular.module('geosilesia').component('gallery', {
        templateUrl: 'html/views/gallery.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: GalleryController
    });

    GalleryController.$inject = ['$http', '$routeParams', '$rootScope'];

    function GalleryController($http, $routeParams, $rootScope){
        var vm = this;
        vm.$onInit = onInit;
        vm.showFullMode = false;
        vm.openFullMode = openFullMode;

        function openFullMode(img) {
            vm.showFullMode = true;
            vm.openWith = img;
            $rootScope.blur = true;
        }

        function onInit() {
            $http.get("json/galleries/" + $routeParams.galleryId + ".json").then(function (gallery) {
                vm.gallery = gallery.data;
            });
        }
    }
})();