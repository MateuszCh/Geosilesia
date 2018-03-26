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
                 title: 'strony',
                 pluralTitle: 'stron',
                 url: '/pages',
                 component: 'listing',
                 family: 'pages',
                 resolve: {
                     model: statePromises.pages
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
                 component: 'listing',
                 family: 'posts',
                 resolve: {
                     model: statePromises.postTypeWithPosts
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
                 title: 'typy postów',
                 pluralTitle: 'typów postów',
                 url: '/post-types',
                 component: 'listing',
                 family: 'postTypes',
                 resolve: {
                     model: statePromises.postTypes
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
                 title: 'komponenty',
                 pluralTitle: 'komponentów',
                 url: '/components',
                 component: 'listing',
                 family: 'components',
                 resolve: {
                     model: statePromises.components
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