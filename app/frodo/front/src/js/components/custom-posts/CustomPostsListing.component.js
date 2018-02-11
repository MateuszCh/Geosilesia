(function(){
    angular.module('frodo').component('customPostsListing', {
        templateUrl: 'html/components/custom-posts/custom-posts-listing.html',
        controllerAs: 'vm',
        controller: CustomPostsListingController
    });

    CustomPostsListingController.$inject = ['customPostTypesService', '$routeParams', '$location'];
    function CustomPostsListingController(customPostTypesService, $routeParams, $location){
        var vm  = this;
        vm.$onInit = onInit;
        // vm.removeStatus = false;

        function onInit(){
            getCustomPostType();
        }

        function getCustomPostType(){
            customPostTypesService.getById($routeParams.id)
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

    }
})();