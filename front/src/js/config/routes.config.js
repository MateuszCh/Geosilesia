(function(){
    angular.module('geosilesia').config(['$routeProvider',
        function ($routeProvider) {

            var originalWhen = $routeProvider.when;

            $routeProvider.when = function(path, route){
                route.resolve || (route.resolve = {});
                angular.extend(route.resolve, {
                    page: ['pagesService', '$route', function(pagesService, $route){
                        var page;
                        if(path === '/:page') {
                            page = $route.current.params.page;
                        } else {
                            page = path.substring(1);
                        }
                        return pagesService.loadPage(page);
                    }]
                });
                return originalWhen.call($routeProvider, path, route);
            };

            $routeProvider.
            // when('/',{
            //     templateUrl: 'html/views/homepage.html',
            //     resolve : {
            //         markers:['postsService', function(postsService){
            //             return postsService.loadPosts('marker');
            //         }],
            //         page: ['pagesService', function(pagesService){
            //             return pagesService.loadPage('/');
            //         }]
            //     },
            //     controller: ['$scope','markers', 'page', function($scope, markers, page){
            //         $scope.markers = markers;
            //         $scope.page = page
            //     }]
            // }).
            // when('/o-nas', {
            //     templateUrl: 'html/views/about.html'
            // }).
            // when('/english', {
            //     templateUrl: 'html/views/english.html'
            // }).
            // when('/slownik', {
            //     templateUrl: 'html/views/dictionary.html'
            // }).
            // when('/wydarzenia', {
            //     template: '<news events="events"></news>',
            //     resolve : {
            //         events: ['postsService', function(postsService){
            //             return postsService.loadPosts('wydarzenie');
            //         }]
            //     },
            //     controller: ['$scope', 'events', function($scope, events){
            //         if(events && events.length){
            //             $scope.events = events.reverse();
            //         }
            //     }]
            // }).
            // when('/galeria', {
            //     template: '<main-gallery></main-gallery>'
            // }).
            // when('/galeria/:galleryId', {
            //     template: '<gallery></gallery>'
            // }).
            // when('/polozenie', {
            //     templateUrl: 'html/views/geosilesia/location.html'
            // }).
            // when('/rzezba', {
            //     templateUrl: 'html/views/geosilesia/terrain.html'
            // }).
            // when('/budowa', {
            //     templateUrl: 'html/views/geosilesia/structure.html'
            // }).
            // when('/geostanowiska', {
            //     templateUrl: 'html/views/geosilesia/geosites.html'
            // }).
            // when('/atrakcje', {
            //     templateUrl: 'html/views/geosilesia/attractions.html'
            // }).
            when('/', {
                template: '<page-view page="page"></page-view>',
                resolve: {
                    markers:['postsService', function(postsService){
                        return postsService.loadPosts('marker');
                    }],
                },
                controller: ['page', '$scope', function(page, $scope){
                    $scope.page = page[0];
                }]
            }).
            when('/wydarzenia', {
               template: '<page-view page="page"></page-view>',
               resolve: {
                   events: ['postsService', function(postsService){
                       return postsService.loadPosts('wydarzenie');
                   }]
               } ,
                controller: ['page', '$scope', function(page, $scope){
                   $scope.page = page[0];
                }]
            }).
            when('/:page', {
                template: '<page-view page="page"></page-view>',
                controller: ['page', '$scope', function(page, $scope){
                    $scope.page = page[0];
                }]
            })

        }
    ]);
})();
