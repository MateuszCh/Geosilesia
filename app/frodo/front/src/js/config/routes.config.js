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
           .when('/post-types', {
               template: '<post-types-listing></post-types-listing>'
           })
           .when('/post-types/add', {
               template: '<post-type></post-type>'
           })
           .when('/post-types/edit/:id', {
               template: '<post-type edit="true"></post-type>'
           })
           .when('/posts/:type', {
               template: '<posts-listing></posts-listing>'
           })
           .when('/post/add/:type', {
               template: '<post></post>'
           })
           .when('/post/edit/:id', {
               template: '<post edit="true"></post>'
           })
           .otherwise('/dashboard');

   }])
})();