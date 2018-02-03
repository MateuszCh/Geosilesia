(function(){
    angular.module('frodo').component('header', {
        templateUrl: 'html/components/header.html',
        controllerAs: 'vm',
        controller: HeaderController
    });

    HeaderController.$inject = ['customPostTypesService', '$location', '$scope'];
    function HeaderController(customPostTypesService, $location, $scope){
        var vm  = this;
        vm.$onInit = onInit;

        function onInit(){
            vm.websiteAddress = getWebsiteAddress();
            getCustomPostTypes();

            $scope.$on('customPostTypesUpdated', function(){
                getCustomPostTypes();
            })
        }

        function getCustomPostTypes(){
            customPostTypesService.getAll()
                .then(function(response){
                    vm.customPostTypes = response.data;
                })
        }

        function getWebsiteAddress(){
            var address = $location.host();
            return address.substring(address.indexOf('.') + 1);
        }
    }
})();