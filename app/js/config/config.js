/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */

(function(){
    angular.module('geosilesia').config(['$locationProvider', '$routeProvider',
        function ($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider.
            when('/',{
                template: '<homepage></homepage>'
            }).
            when('/about', {
                template: '<about></about>'
            }).
            when('/english', {
                template: '<english></english>'
            }).
            when('/dictionary', {
                template: '<dictionary></dictionary>'
            }).
            when('/news', {
                template: '<events></events>'
            }).
            when('/gallery', {
                templateUrl: 'html/views/gallery.html'
            }).
            otherwise('/');
            $locationProvider.html5Mode(true);

        }
    ]);
})();
