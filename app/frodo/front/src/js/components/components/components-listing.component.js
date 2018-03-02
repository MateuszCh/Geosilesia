(function(){
    angular.module('frodo').component('componentsListing', {
        templateUrl: 'html/components/components/components-listing.html',
        controllerAs: 'vm',
        controller: ComponentsListingController
    });

    ComponentsListingController.$inject = ['componentsService', '$rootScope', '$timeout'];
    function ComponentsListingController(componentsService, $rootScope, $timeout){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removeComponent = removeComponent;
        vm.loadingComponents = true;
        vm.removeStatus = {
            busy: false,
            result: "",
            status: undefined,
        };
        var resultTimeout;

        function onInit(){
            getComponents();
        }

        function removeComponent(id){
            $timeout.cancel(resultTimeout);
            setRemoveStatus(id);
            componentsService.remove(id)
                .then(function(response){
                    setRemoveStatus(id, response.data, response.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                    getComponents();
                })
                .catch(function(err){
                    setRemoveStatus(false, err.data.error, err.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                })
        }

        function getComponents(){
            vm.loadingComponents = true;
            componentsService.getAll()
                .then(function(response){
                    vm.components = response.data;
                    vm.loadingComponents = false;
                })
                .catch(function(){
                    vm.loadingComponents = false;
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