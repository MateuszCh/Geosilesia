(function(){
    angular.module('frodo').component('postsListing', {
        templateUrl: 'html/components/posts/posts-listing.html',
        controllerAs: 'vm',
        controller: PostsListingController
    });

    PostsListingController.$inject = ['postTypesService', 'postsService', '$routeParams', '$location'];
    function PostsListingController(postTypesService, postsService, $routeParams, $location){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removeStatus = false;
        vm.removePost = removePost;

        function onInit(){
            getPostType();
        }

        function getPostType(){
            postTypesService.getByTypeWithPosts($routeParams.type)
                .then(function(response){
                    if(!response.data){
                        $location.path('/');
                        return;
                    }
                    vm.model = response.data;
                })
                .catch(function(err){
                    $location.path('/');
                })
        }

        function removePost(id){
            vm.removeStatus = id;
            postsService.removeById(id)
                .then(function(response){
                    vm.removeStatus = false;
                    getPostType();

                })
                .catch(function(err){
                    vm.removeStatus = false;
                    console.log(err);
                })
        }

    }
})();