(function(){
    angular.module('geosilesia').component('homepage', {
        templateUrl: 'html/views/homepage.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: HomepageController
    });

    HomepageController.$inject = ['$http', '$window', '$rootScope', '$timeout'];

    function HomepageController($http, $window, $rootScope, $timeout){
        var vm = this;
        vm.markers = [];
        vm.$onInit = onInit;
        vm.$onDestroy = onDestroy;
        var mainHeader = document.getElementById("mainHeader");
        var heightInner;

        function onDestroy(){
            $rootScope.hideHeader = false;
            $window.removeEventListener('scroll', hideHeader);
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

            if(document.getElementById('map')){
                $window.addEventListener('scroll', hideHeader);
            }
        }

        function hideHeader(){
            if(mainHeader){
                var sizeOfHeader = mainHeader.offsetHeight;
                setBannerHeight();
                var scrollTopWindow = $window.scrollY;
                var diff = scrollTopWindow + sizeOfHeader;
                if(heightInner < diff){
                    $rootScope.hideHeader = true;
                } else {
                    $rootScope.hideHeader = false;
                }
            }
        }
    }
})();


