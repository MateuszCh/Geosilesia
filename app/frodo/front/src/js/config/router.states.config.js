(function(){
   angular.module('frodo').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
         var states = {
             dashboard: {
                 name: 'dashboard',
                 url: '/dashboard',
                 templateUrl: 'html/components/layout/dashboard.html',
                 family: 'dashboard'
             },
             pages: {
                 name: 'pages',
                 url: '/pages',
                 template: '<pages-listing></pages-listing>',
                 family: 'pages'
             },
             pagesAdd: {
                 name: 'pagesAdd',
                 url: '/pages/add',
                 template: '<page></page>',
                 family: 'pages'
             },
             pagesEdit: {
                 name: 'pagesEdit',
                 url: '/pages/edit/:id',
                 template: '<page edit="true"></page>',
                 family: 'pages'
             },
             posts: {
                 name: 'posts',
                 url: '/posts/:type',
                 template: '<posts-listing></posts-listing>',
                 family: 'posts'
             },
             postsAdd: {
                 name: 'postsAdd',
                 url: '/posts/:type/add',
                 template: '<post></post>',
                 family: 'posts'
             },
             postsEdit: {
                 name: 'postsEdit',
                 url: '/posts/:type/edit/:id',
                 template: '<post edit="true"></post>',
                 family: 'posts'
             },
             postsTypes: {
                 name: 'postTypes',
                 url: '/post-types',
                 template: '<post-types-listing></post-types-listing>',
                 family: 'postTypes'
             },
             postsTypeAdd: {
                 name: 'postTypesAdd',
                 url: '/post-types/add',
                 template: '<post-type></post-type>',
                 family: 'postTypes'
             },
             postsTypeEdit: {
                 name: 'postTypesEdit',
                 url: '/post-types/edit/:id',
                 template: '<post-type edit="true"></post-type>',
                 family: 'postTypes'
             },
             components: {
                 name: 'components',
                 url: '/components',
                 template: '<components-listing></components-listing>',
                 family: 'components'
             },
             componentsAdd: {
                 name: 'componentsAdd',
                 url: '/components/add',
                 template: '<component></component>',
                 family: 'components'
             },
             componentsEdit: {
                 name: 'componentsEdit',
                 url: '/components/edit/:id',
                 template: '<component edit="true"></component>',
                 family: 'components'
             },
             files: {
                 name: 'files',
                 url: '/files',
                 template: '<files section="true"></files>',
                 family: 'files'
             }
         };

        for(var prop in states){
            $stateProvider.state(states[prop]);
        }

        $urlRouterProvider.otherwise(('/dashboard'));

   }])
})();