(function(){
    angular.module('geosilesia').component('homepage', {
        templateUrl: 'html/components/homepage.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: HomepageController
    });

    HomepageController.$inject = ['$window', '$timeout'];

    function HomepageController($window, $timeout){
        var vm = this;
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


