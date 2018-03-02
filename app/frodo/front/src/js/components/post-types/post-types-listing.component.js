(function(){
    angular.module('frodo').component('postTypesListing', {
        templateUrl: 'html/components/post-types/post-types-listing.html',
        controllerAs: 'vm',
        controller: PostTypesListingController
    });

    PostTypesListingController.$inject = ['postTypesService', '$rootScope', '$timeout'];
    function PostTypesListingController(postTypesService, $rootScope, $timeout){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removePostType = removePostType;
        vm.loadingPostTypes = true;
        vm.removeStatus = {
            busy: false,
            result: "",
            status: undefined,
        };
        var resultTimeout;

        function onInit(){
            getPostTypes();
        }

        function removePostType(id){
            $timeout.cancel(resultTimeout);
            setRemoveStatus(id);
            postTypesService.remove(id)
                .then(function(response){
                    setRemoveStatus(id, response.data, response.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                    $rootScope.$broadcast('postTypesUpdated');
                    getPostTypes();
                })
                .catch(function(err){
                    setRemoveStatus(false, err.data.error, err.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                })
        }

        function getPostTypes(){
            vm.loadingPostTypes = true;
            postTypesService.getAll()
                .then(function(response){
                    vm.postTypes = response.data;
                    vm.loadingPostTypes = false;
                })
                .catch(function(){
                    vm.loadingPostTypes = false;
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