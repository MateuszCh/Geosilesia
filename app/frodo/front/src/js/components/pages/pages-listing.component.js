(function(){
    angular.module('frodo').component('pagesListing', {
        templateUrl: 'html/components/pages/pages-listing.html',
        controllerAs: 'vm',
        bindings: {
            pages: '<'
        },
        controller: PagesListingController
    });

    PagesListingController.$inject = ['pagesService', '$rootScope', '$timeout', '$state'];
    function PagesListingController(pagesService, $rootScope, $timeout, $state){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removePage = removePage;
        vm.redirect = redirect;
        vm.removeStatus = {
            busy: false,
            result: "",
            status: undefined,
        };
        var resultTimeout;

        function onInit(){
            vm.pages = vm.pages.data;
        }

        function redirect(to, params){
            $state.go(to, params)
        }

        function removePage(id, i){
            $timeout.cancel(resultTimeout);
            setRemoveStatus(id);
            pagesService.remove(id)
                .then(function(response){
                    setRemoveStatus(id, response.data, response.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                    vm.pages.splice(i, 1);
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