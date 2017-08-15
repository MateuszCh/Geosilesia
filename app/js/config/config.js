(function(){
    angular.module('geosilesia').config(['$locationProvider', '$routeProvider',
        function ($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider.
            when('/',{
                template: '<homepage></homepage>'
            }).
            when('/o-nas', {
                templateUrl: 'html/views/about.html'
            }).
            when('/english', {
                templateUrl: 'html/views/english.html'
            }).
            when('/slownik', {
                templateUrl: 'html/views/dictionary.html'
            }).
            when('/wydarzenia', {
                template: '<events></events>'
            }).
            when('/galeria', {
                template: '<main-gallery></main-gallery>'
            }).
            when('/galeria/:galleryId', {
                template: '<gallery></gallery>'
            }).
            when('/polozenie', {
                templateUrl: 'html/views/geoslask/location.html'
            }).
            when('/rzezba', {
                templateUrl: 'html/views/geoslask/terrain.html'
            }).
            when('/budowa', {
                templateUrl: 'html/views/geoslask/structure.html'
            }).
            when('/geostanowiska', {
                templateUrl: 'html/views/geoslask/geosites.html'
            }).
            when('/atrakcje', {
                templateUrl: 'html/views/geoslask/attractions.html'
            }).
            otherwise('/');
            $locationProvider.html5Mode(true);

        }
    ]);
})();
