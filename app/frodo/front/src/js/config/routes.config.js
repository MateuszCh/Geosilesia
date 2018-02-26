(function(){
   angular.module('frodo').config(['$routeProvider', function($routeProvider){

       $routeProvider
           .when('/dashboard',{
               templateUrl: 'html/views/dashboard.html'
           })
           .when('/pages', {
               template: '<pages-listing></pages-listing>'
           })
           .when('/page/add', {
               template: '<page></page>'
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
           .when('/post-types', {
               template: '<post-types-listing></post-types-listing>'
           })
           .when('/post-type/add', {
               template: '<post-type></post-type>'
           })
           .when('/post-type/edit/:id', {
               template: '<post-type edit="true"></post-type>'
           })
           .when('/components', {
               template: '<components-listing></components-listing>'
           })
           .when('/component/add', {
               template: '<component></component>'
           })
           .when('/component/edit/:id', {
               template: '<component edit="true"></component>'
           })
           .otherwise('/dashboard');

   }])
})();