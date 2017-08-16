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
        var heightInner;

        function onDestroy(){
            $window.removeEventListener('scroll', setBannerHeight);
        }

        function setBannerHeight(){
            heightInner = $window.innerHeight;
            vm.bannerHeight = heightInner + 'px';
        }

        function onInit(){
            $http.get("json/markers.json").then(function (response) {
                vm.markers = response.data.obiekty;
            });
            setBannerHeight();
            $window.addEventListener('resize', function(){
                $timeout(function () {
                    setBannerHeight();
                }, 1);
            });
            $window.addEventListener('scroll', setBannerHeight);
        }
    }
})();


