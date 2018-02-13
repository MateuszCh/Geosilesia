(function(){
    angular.module('frodo').component('customPostsListing', {
        templateUrl: 'html/components/custom-posts/custom-posts-listing.html',
        controllerAs: 'vm',
        controller: CustomPostsListingController
    });

    CustomPostsListingController.$inject = ['customPostTypesService', 'customPostsService', '$routeParams', '$location'];
    function CustomPostsListingController(customPostTypesService, customPostsService, $routeParams, $location){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removeStatus = false;
        vm.removeCustomPost = removeCustomPost;

        function onInit(){
            getCustomPostType();
        }

        function getCustomPostType(){
            customPostTypesService.getByTypeWithPosts($routeParams.type)
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

        function removeCustomPost(id){
            vm.removeStatus = id;
            customPostsService.removeById(id)
                .then(function(response){
                    vm.removeStatus = false;
                    getCustomPostType();

                })
                .catch(function(err){
                    vm.removeStatus = false;
                    console.log(err);
                })
        }

    }
})();