/**
 * Created by Mateusz Chybiorz on 2017-03-24.
 */

(function(){
    var geosilesia = angular.module('geosilesia', ['ngRoute', 'ngAnimate']);

    angular.module('geosilesia').controller('MainController', ['$scope', '$window', function($scope, $window){
        angular.element($window).on("scroll", function() {
            if (this.pageYOffset >= 100) {
                $scope.showButtonUp = true;
            } else {
                $scope.showButtonUp = false;
            }
            $scope.$apply();
        });
    }]);
})();

