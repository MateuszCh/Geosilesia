(function(){
    angular.module('frodo').component('componentsListing', {
        templateUrl: 'html/components/components/components-listing.html',
        controllerAs: 'vm',
        bindings: {
          components: '<'
        },
        controller: ComponentsListingController
    });

    ComponentsListingController.$inject = ['componentsService', '$rootScope', '$timeout'];
    function ComponentsListingController(componentsService, $rootScope, $timeout){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removeComponent = removeComponent;
        vm.removeStatus = {
            busy: false,
            result: "",
            status: undefined,
        };
        var resultTimeout;

        function onInit(){
            vm.components = vm.components.data;
        }

        function removeComponent(id, i){
            $timeout.cancel(resultTimeout);
            setRemoveStatus(id);
            componentsService.remove(id)
                .then(function(response){
                    setRemoveStatus(id, response.data, response.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                    vm.components.splice(i, 1);
                })
                .catch(function(err){
                    setRemoveStatus(false, err.data.error, err.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                })
        }

        function setRemoveStatus(id, result, status){
            vm.removeStatus = {
                busy: id || false,
                result: result || "",
                status: status || undefined
            };
        }
    }
})();