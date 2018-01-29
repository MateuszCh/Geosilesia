(function(){
    angular.module('geosilesia').controller('MainController', ['$scope', '$window', '$rootScope', function($scope, $window, $rootScope){
        $rootScope.$on("$routeChangeSuccess", function(){
            $window.scrollTo(0,0);
            $rootScope.blur = false;
        });
    }]);
})();

