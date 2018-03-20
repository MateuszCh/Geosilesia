(function(){
   angular.module('frodo').config(['$stateProvider', '$urlRouterProvider', 'statePromises', function($stateProvider, $urlRouterProvider, statePromises){
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
                 component: 'pagesListing',
                 family: 'pages',
                 resolve: {
                     pages: statePromises.pages
                 }
             },
             pageAdd: {
                 name: 'pagesAdd',
                 url: '/pages/add',
                 component: 'page',
                 family: 'pages',
                 resolve: {
                     components: statePromises.components
                 }
             },
             pageEdit: {
                 name: 'pagesEdit',
                 url: '/pages/edit/:id',
                 template: '<page components="$resolve.components" page="$resolve.page" edit="true"></page>',
                 family: 'pages',
                 resolve: {
                     components: statePromises.components,
                     page: statePromises.page
                 }
             },
             posts: {
                 name: 'posts',
                 url: '/posts/:type',
                 component: 'postsListing',
                 family: 'posts',
                 resolve: {
                     postType: statePromises.postTypeWithPosts
                 }
             },
             postAdd: {
                 name: 'postsAdd',
                 url: '/posts/:type/add',
                 component: 'post',
                 family: 'posts',
                 resolve: {
                     postType: statePromises.postType
                 }
             },
             postEdit: {
                 name: 'postsEdit',
                 url: '/posts/:type/edit/:id',
                 template: '<post post="$resolve.post" post-type="$resolve.postType" edit="true"></post>',
                 family: 'posts',
                 resolve: {
                     postType: statePromises.postType,
                     post: statePromises.post
                 }
             },
             postTypes: {
                 name: 'postTypes',
                 url: '/post-types',
                 component: 'postTypesListing',
                 family: 'postTypes',
                 resolve: {
                     postTypes: statePromises.postTypes
                 }
             },
             postTypeAdd: {
                 name: 'postTypesAdd',
                 url: '/post-types/add',
                 component: 'postType',
                 family: 'postTypes'
             },
             postTypeEdit: {
                 name: 'postTypesEdit',
                 url: '/post-types/edit/:id',
                 template: '<post-type post-type="$resolve.postType.data" edit="true"></post-type>',
                 family: 'postTypes',
                 resolve: {
                     postType: statePromises.postTypeById
                 }
             },
             components: {
                 name: 'components',
                 url: '/components',
                 component: 'componentsListing',
                 family: 'components',
                 resolve: {
                     components: statePromises.components
                 }
             },
             componentAdd: {
                 name: 'componentsAdd',
                 url: '/components/add',
                 component: 'component',
                 family: 'components'
             },
             componentEdit: {
                 name: 'componentsEdit',
                 url: '/components/edit/:id',
                 template: '<component component="$resolve.component.data" edit="true"></component>',
                 family: 'components',
                 resolve: {
                     component: statePromises.component
                 }
             },
             files: {
                 name: 'files',
                 url: '/files',
                 component: 'files',
                 family: 'files',
                 resolve: {
                     allFiles: statePromises.files
                 }
             }
         };

        for(var prop in states){
            $stateProvider.state(states[prop]);
        }

        $urlRouterProvider.otherwise(('/dashboard'));

   }])
})();