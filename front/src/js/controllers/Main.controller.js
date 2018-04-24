(function(){
    angular.module('geosilesia').controller('MainController', ['$window', '$rootScope', function($window, $rootScope){
        $rootScope.$on("$routeChangeSuccess", function(){
            $window.scrollTo(0,0);
            $rootScope.blur = false;
        });
    }]);
})();

