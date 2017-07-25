/**
 * Created by Mateusz Chybiorz on 2017-07-26.
 */
(function(){
    angular.module('geosilesia').component('galleries', {
        templateUrl: 'html/views/galleries.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: GalleriesController
    });

    GalleriesController.$inject = ['$http', '$timeout'];

    function GalleriesController($http, $timeout){
        var vm = this;
        vm.galleries = [];
        vm.$onInit = onInit;
        vm.selectedCategory = 'all';
        vm.changeCategory = changeCategory;
        var timer;

        vm.categories = [
            {category: 'wyzyna', categoryText : 'krainy geograficzne'},
            {category: 'mineralySkaly', categoryText : 'minerały i skały'},
            {category : 'dziedzictwo', categoryText : 'dziedzictwo poprzemysłowe'},
            {category : 'sciezki', categoryText : 'ścieżki tematyczne'},
            {category : 'wydarzenia', categoryText : 'wydarzenia'},
            {category : 'all', categoryText: 'wszystkie'}
        ];

        function onInit() {
            $http.get("json/gallery.json").then(function (response) {
                vm.galleries = response.data.gallery;
            });
        }

        function changeCategory(category){

            if(vm.selectedCategory !== category){
                $timeout.cancel(timer);
                vm.selectedCategory = undefined;
                timer = $timeout(function () {
                    vm.selectedCategory = category;
                }, 300);

            }
        }
    }
})();