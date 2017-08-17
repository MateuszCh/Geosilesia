(function(){
    angular.module('geosilesia').component('homepage', {
        templateUrl: 'html/views/homepage.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: HomepageController
    });

    HomepageController.$inject = ['$http', '$window', '$timeout'];

    function HomepageController($http, $window, $timeout){
        var vm = this;
        vm.markers = [];
        vm.$onInit = onInit;
        vm.$onDestroy = onDestroy;
        vm.search = search;
        vm.location = "";
        var heightInner, attractions;

        function onDestroy(){
            $window.removeEventListener('scroll', setBannerHeight);
        }

        function setBannerHeight(){
            heightInner = $window.innerHeight;
            vm.bannerHeight = heightInner + 'px';
        }

        function onInit(){
            $http.get("json/markers.json").then(function (response) {
                attractions = response.data.obiekty;
                vm.markers = attractions.slice();
            });
            setBannerHeight();
            $window.addEventListener('resize', function(){
                $timeout(function () {
                    setBannerHeight();
                }, 1);
            });
            $window.addEventListener('scroll', setBannerHeight);
        }

        function search(input){
            vm.location = "";
            if(!isNaN(input) && input < 200){
                vm.markers = attractions.slice(input, parseInt(input) + 20);
                console.log(vm.markers);
                console.log("It's a number!");
            }
        }
    }
})();


