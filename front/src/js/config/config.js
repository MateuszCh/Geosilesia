(function() {
    angular.module("geosilesia").config([
        "$locationProvider",
        function($locationProvider) {
            $locationProvider.hashPrefix("");
            $locationProvider.html5Mode(true);
        }
    ]);
})();
