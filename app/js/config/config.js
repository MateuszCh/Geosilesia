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
            when('/o-nas', {
                template: '<about></about>'
            }).
            when('/english', {
                template: '<english></english>'
            }).
            when('/slownik', {
                template: '<dictionary></dictionary>'
            }).
            when('/wydarzenia', {
                template: '<events></events>'
            }).
            when('/galeria', {
                template: '<gallery></gallery>'
            }).
            when('/polozenie', {
                templateUrl: 'html/views/geoslask/polozenie.html'
            }).
            when('/rzezba', {
                templateUrl: 'html/views/geoslask/rzezba.html'
            }).
            when('/budowa', {
                templateUrl: 'html/views/geoslask/budowa.html'
            }).
            when('/geostanowiska', {
                templateUrl: 'html/views/geoslask/geostanowiska.html'
            }).
            when('/atrakcje', {
                templateUrl: 'html/views/geoslask/atrakcje.html'
            }).
            otherwise('/');
            $locationProvider.html5Mode(true);

        }
    ]);
})();
