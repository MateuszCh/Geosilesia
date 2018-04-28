(function(){
    angular.module('geosilesia').controller('MainController', ['$window', '$rootScope', '$scope', function($window, $rootScope, $scope){
        $rootScope.$on("$routeChangeSuccess", function(){
            $window.scrollTo(0,0);
            $rootScope.blur = false;
        });
        window.setTimeout(function(){
            document.addEventListener('scroll', function(){
                $scope.scrolled = window.scrollY > 0;
                $scope.$apply();
            })
        }, 1000);

    }]);
})();

