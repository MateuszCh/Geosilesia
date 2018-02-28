(function(){
    angular.module('frodo').component('pagesListing', {
        templateUrl: 'html/components/pages/pages-listing.html',
        controllerAs: 'vm',
        controller: PagesListingController
    });

    PagesListingController.$inject = ['pagesService', '$rootScope', '$timeout'];
    function PagesListingController(pagesService, $rootScope, $timeout){
        var vm  = this;
        vm.$onInit = onInit;
        vm.removePage = removePage;
        vm.loadingPages = true;
        vm.removeStatus = {
            busy: false,
            result: "",
            status: undefined,
        };
        var resultTimeout;

        function onInit(){
            getPages();
        }

        function removePage(id){
            $timeout.cancel(resultTimeout);
            setRemoveStatus(id);
            pagesService.remove(id)
                .then(function(response){
                    setRemoveStatus(id, response.data, response.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                    getPages();
                })
                .catch(function(err){
                    setRemoveStatus(false, err.data.error, err.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                })
        }

        function getPages(){
            vm.loadingPages = true;
            pagesService.getAll()
                .then(function(response){
                    vm.pages = response.data;
                    vm.loadingPages = false;
                })
                .catch(function(){
                    vm.loadingPages = false;
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