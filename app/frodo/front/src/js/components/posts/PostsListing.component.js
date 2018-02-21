(function(){
    angular.module('frodo').component('postsListing', {
        templateUrl: 'html/components/posts/posts-listing.html',
        controllerAs: 'vm',
        controller: PostsListingController
    });

    PostsListingController.$inject = ['postTypesService', 'postsService', '$routeParams', '$location', '$timeout'];
    function PostsListingController(postTypesService, postsService, $routeParams, $location, $timeout){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removePost = removePost;
        vm.loadingPostType = true;
        vm.removeStatus = {
            id: undefined,
            result: "",
            status: undefined,
        };
        var resultTimeout;

        function onInit(){
            getPostType();
        }

        function getPostType(){
            vm.loadingPostType = true;
            postTypesService.getByTypeWithPosts($routeParams.type)
                .then(function(response){
                    vm.loadingPostType = false;
                    if(!response.data){
                        $location.path('/');
                        return;
                    }
                    vm.model = response.data;
                })
                .catch(function(){
                    vm.loadingPostType = false;
                    $location.path('/');
                })
        }

        function removePost(id){
            $timeout.cancel(resultTimeout);
            setRemoveStatus(id);
            postsService.remove(id)
                .then(function(){
                    setRemoveStatus(undefined);
                    getPostType();
                })
                .catch(function(err){
                    setRemoveStatus(undefined, err.data.error, err.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                    console.log(err);
                })
        }

        function setRemoveStatus(id, result, status){
            vm.removeStatus = {
                id: id || undefined,
                result: result || "",
                status: status || undefined
            };
        }

    }
})();