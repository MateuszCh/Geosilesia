(function(){
   angular.module('frodo').config(['$routeProvider', function($routeProvider){

       $routeProvider
           .when('/dashboard',{
               templateUrl: 'html/views/dashboard.html'
           })
           .when('/pages', {
               template: '<pages></pages>'
           })
           .when('/pages/add', {
               template: '<new-page></new-page>'
           })
           .when('/custom-post-types', {
               template: '<custom-post-types-listing></custom-post-types-listing>'
           })
           .when('/custom-post-types/add', {
               template: '<custom-post-type></custom-post-type>'
           })
           .when('/custom-post-types/edit/:id', {
               template: '<custom-post-type edit="true"></custom-post-type>'
           })
           .otherwise('/dashboard');

   }])
})();