(function(){
    angular.module('frodo').component('customPostTypes', {
        templateUrl: 'html/components/custom-post-types/custom-post-types.html',
        controllerAs: 'vm',
        controller: CustomPostTypesController
    });

    CustomPostTypesController.$inject = ['customPostTypesService', '$rootScope'];
    function CustomPostTypesController(customPostTypesService, $rootScope){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removeCustomPostType = removeCustomPostType;
        vm.removeStatus = {
            busy: false
        };

        function onInit(){
            getCustomPostTypes();
        }

        function removeCustomPostType(id){
            vm.removeStatus.busy = true;
            customPostTypesService.removeById(id)
                .then(function(response){
                    vm.removeStatus.busy = false;
                    getCustomPostTypes();
                    $rootScope.$broadcast('customPostTypesUpdated');

                })
                .catch(function(err){
                    vm.removeStatus.busy = false;
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