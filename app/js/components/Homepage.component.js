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

    HomepageController.$inject = ['$http', '$window', '$rootScope'];

    function HomepageController($http, $window, $rootScope){
        var vm = this;
        vm.markers = [];
        vm.$onInit = onInit;
        vm.$onDestroy = onDestroy;
        var mainHeader = document.getElementById("mainHeader");

        function onDestroy(){
            $rootScope.hideHeader = false;
            $window.removeEventListener('scroll', hideHeader);
        }

        function onInit(){
            $http.get("json/markers.json").then(function (response) {
                vm.markers = response.data.obiekty;
            });

            if(document.getElementById('map')){
                $window.addEventListener('scroll', hideHeader);
            }
        }

        function hideHeader(){
            if(mainHeader){
                var sizeOfHeader = mainHeader.offsetHeight;
                var heighInner = $window.innerHeight;
                var scrollTopWindow = $window.scrollY;
                var diff = scrollTopWindow + sizeOfHeader;
                if(heighInner < diff){
                    $rootScope.hideHeader = true;
                } else {
                    $rootScope.hideHeader = false;
                }
            }
        }
    }
})();


