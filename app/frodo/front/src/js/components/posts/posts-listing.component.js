(function(){
    angular.module('frodo').component('postsListing', {
        templateUrl: 'html/components/posts/posts-listing.html',
        controllerAs: 'vm',
        bindings: {
          model: '<postType'
        },
        controller: PostsListingController
    });

    PostsListingController.$inject = ['postTypesService', 'postsService', '$location', '$timeout', '$state'];
    function PostsListingController(postTypesService, postsService, $location, $timeout, $state){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removePost = removePost;
        vm.removeStatus = {
            id: undefined,
            result: "",
            status: undefined,
        };
        var resultTimeout;

        function onInit(){
            vm.model = vm.model.data;
        }

        function removePost(id, i){
            $timeout.cancel(resultTimeout);
            setRemoveStatus(id);
            postsService.remove(id)
                .then(function(){
                    setRemoveStatus(undefined);
                    vm.model.posts.splice(i, 1);
                })
                .catch(function(err){
                    setRemoveStatus(undefined, err.data.error, err.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
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