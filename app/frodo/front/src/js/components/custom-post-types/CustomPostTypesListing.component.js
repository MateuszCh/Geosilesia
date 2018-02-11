(function(){
    angular.module('frodo').component('customPostTypesListing', {
        templateUrl: 'html/components/custom-post-types/custom-post-types-listing.html',
        controllerAs: 'vm',
        controller: CustomPostTypesListingController
    });

    CustomPostTypesListingController.$inject = ['customPostTypesService', '$rootScope'];
    function CustomPostTypesListingController(customPostTypesService, $rootScope){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removeCustomPostType = removeCustomPostType;
        vm.removeStatus = false

        function onInit(){
            getCustomPostTypes();
        }

        function removeCustomPostType(id){
            vm.removeStatus = id;
            customPostTypesService.removeById(id)
                .then(function(response){
                    vm.removeStatus = false;
                    getCustomPostTypes();
                    $rootScope.$broadcast('customPostTypesUpdated');

                })
                .catch(function(err){
                    vm.removeStatus = false;
                    console.log(err);
                })
        }

        function getCustomPostTypes(){
            customPostTypesService.getAll()
                .then(function(response){
                    vm.customPostTypes = response.data;
                })
        }

    }
})();