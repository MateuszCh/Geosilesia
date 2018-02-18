(function(){
    angular.module('frodo').component('postTypesListing', {
        templateUrl: 'html/components/post-types/post-types-listing.html',
        controllerAs: 'vm',
        controller: PostTypesListingController
    });

    PostTypesListingController.$inject = ['postTypesService', '$rootScope'];
    function PostTypesListingController(postTypesService, $rootScope){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removePostType = removePostType;
        vm.removeStatus = false;

        function onInit(){
            getPostTypes();
        }

        function removePostType(id){
            vm.removeStatus = id;
            postTypesService.remove(id)
                .then(function(response){
                    vm.removeStatus = false;
                    getPostTypes();
                    $rootScope.$broadcast('postTypesUpdated');

                })
                .catch(function(err){
                    vm.removeStatus = false;
                    console.log(err);
                })
        }

        function getPostTypes(){
            postTypesService.getAll()
                .then(function(response){
                    vm.postTypes = response.data;
                })
        }

    }
})();