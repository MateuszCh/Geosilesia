(function(){
    angular.module('frodo').component('postTypesListing', {
        templateUrl: 'html/components/post-types/post-types-listing.html',
        controllerAs: 'vm',
        bindings: {
            postTypes: '<'
        },
        controller: PostTypesListingController
    });

    PostTypesListingController.$inject = ['postTypesService', '$rootScope', '$timeout', '$state'];
    function PostTypesListingController(postTypesService, $rootScope, $timeout, $state){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removePostType = removePostType;
        vm.redirect = redirect;
        vm.removeStatus = {
            busy: false,
            result: "",
            status: undefined,
        };
        var resultTimeout;

        function onInit(){
            vm.postTypes = vm.postTypes.data;
        }

        function redirect(to, params){
            $state.go(to, params)
        }

        function removePostType(id, i){
            console.log(i);
            $timeout.cancel(resultTimeout);
            setRemoveStatus(id);
            postTypesService.remove(id)
                .then(function(response){
                    setRemoveStatus(id, response.data, response.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                    $rootScope.$broadcast('postTypesUpdated');
                    vm.postTypes.splice(i, 1);
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