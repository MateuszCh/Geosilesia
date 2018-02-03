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
               template: '<custom-post-types></custom-post-types>'
           })
           .when('/custom-post-types/add', {
               template: '<custom-post-types-add></custom-post-types-add>'
           })
           .when('/custom-post-types/edit/:type', {
               template: '<custom-post-types-edit></custom-post-types-edit>'
           })
           .otherwise('/dashboard');

   }])
})();