(function(){
    angular.module('geosilesia').component('mainGallery', {
        templateUrl: 'html/components/main-gallery.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: MainGalleryController
    });

    MainGalleryController.$inject = ['$http', '$timeout'];

    function MainGalleryController($http, $timeout){
        var vm = this;
        vm.galleries = [];
        vm.$onInit = onInit;
        vm.selectedCategory = 'all';
        vm.changeCategory = changeCategory;
        var timer;

        function onInit() {
            // $http.get("/api/gallery").then(function (response) {
            //     vm.galleries = response.data.gallery;
            //     setCategories(vm.galleries);
            // });
            $http.get("json/gallery.json").then(function (response) {
                vm.galleries = response.data.gallery;
                setCategories(vm.galleries);
            });
        }

        function setCategories(galleries){
            var categories = {};
            galleries.forEach(function(gallery){
                categories[gallery.category] = {
                    category: gallery.category,
                    categoryText: gallery.categoryTitle
                }
            });
            categories.all = {
                category: "all",
                categoryText: "wszystkie"
            };
            vm.categories = categories;
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