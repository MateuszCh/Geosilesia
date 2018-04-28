(function(){
    angular.module('geosilesia').config(['$routeProvider',
        function ($routeProvider) {

            $routeProvider.
            when('/',{
                templateUrl: 'html/views/homepage.html',
                resolve : {
                    markers:['postsService', function(postsService){
                        return postsService.loadPosts('marker');
                    }]
                },
                controller: ['$scope','markers', function($scope, markers){
                    $scope.markers = markers;
                }]
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
                template: '<news events="events"></news>',
                resolve : {
                    events: ['postsService', function(postsService){
                        return postsService.loadPosts('wydarzenie');
                    }]
                },
                controller: ['$scope', 'events', function($scope, events){
                    $scope.events = events.reverse();
                }]
            }).
            when('/galeria', {
                template: '<main-gallery></main-gallery>'
            }).
            when('/galeria/:galleryId', {
                template: '<gallery></gallery>'
            }).
            when('/polozenie', {
                templateUrl: 'html/views/geosilesia/location.html'
            }).
            when('/rzezba', {
                templateUrl: 'html/views/geosilesia/terrain.html'
            }).
            when('/budowa', {
                templateUrl: 'html/views/geosilesia/structure.html'
            }).
            when('/geostanowiska', {
                templateUrl: 'html/views/geosilesia/geosites.html'
            }).
            when('/atrakcje', {
                templateUrl: 'html/views/geosilesia/attractions.html'
            }).
            otherwise('/');

        }
    ]);
})();
