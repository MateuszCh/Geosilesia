(function(){
   angular.module('frodo').config(['$stateProvider', 'statePromises', function($stateProvider, statePromises){
         var states = {
             dashboard: {
                 name: 'dashboard',
                 url: '/',
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
                 component: 'page',
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
                 component: 'post',
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
                 component: 'postType',
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
                 component: 'component',
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
             },
             error: {
                 name: 'error',
                 component: 'error'
             }
         };

        for(var prop in states){
            $stateProvider.state(states[prop]);
        }

   }])
})();