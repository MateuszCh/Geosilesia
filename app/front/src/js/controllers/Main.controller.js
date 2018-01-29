(function(){

    angular.module('geosilesia').controller('MainController', ['$scope', '$window', '$rootScope', function($scope, $window, $rootScope){

        $window.addEventListener('scroll', showButtonUp);

        function showButtonUp(){
            this.pageYOffset >= 100 ? $scope.showButtonUp = true : $scope.showButtonUp = false;
            $scope.$apply();
        }

        $rootScope.$on("$routeChangeSuccess", function(){
            $window.scrollTo(0,0);
            $rootScope.blur = false;
        });

    }]);
})();

