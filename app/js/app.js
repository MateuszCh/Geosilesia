/**
 * Created by Mateusz Chybiorz on 2017-03-24.
 */

(function(){
    var geosilesia = angular.module('geosilesia', ['ngRoute', 'ngAnimate']);

    angular.module('geosilesia').controller('MainController', ['$scope', '$window', '$rootScope', function($scope, $window, $rootScope){
        setSize();
        $window.addEventListener('scroll', showButtonUp);
        $window.addEventListener('resize', setSize);

        function showButtonUp(){
            if (this.pageYOffset >= 100) {
                $scope.showButtonUp = true;
            } else {
                $scope.showButtonUp = false;
            }
            $scope.$apply();
        }

        function resetSizes(){
            $rootScope.isS = false;
            $rootScope.isM = false;
            $rootScope.isL = false;
            $rootScope.isX = false;
        }

        function checkMatchMedia(width){
            return this.matchMedia('(max-width: ' + width + 'px)').matches;
        }

        function setSize(){
            resetSizes();
            if(checkMatchMedia('767')){
                $rootScope.isS = true;
            } else if (checkMatchMedia('1200')){
                $rootScope.isM = true;
            } else if (checkMatchMedia('1500')){
                $rootScope.isL = true;
            } else {
                $rootScope.isX = true;
            }
        }
    }]);
})();

