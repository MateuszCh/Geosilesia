(function(){
    angular.module('frodo').component('header', {
        templateUrl: 'html/components/header.html',
        controllerAs: 'vm',
        controller: HeaderController
    });

    HeaderController.$inject = ['postTypesService', '$location', '$scope'];
    function HeaderController(postTypesService, $location, $scope){
        var vm  = this;
        vm.$onInit = onInit;

        function onInit(){
            vm.websiteAddress = getWebsiteAddress();
            getPostTypes();

            $scope.$on('postTypesUpdated', function(){
                getPostTypes();
            })
        }

        function getPostTypes(){
            postTypesService.getAll()
                .then(function(response){
                    vm.postTypes = response.data;
                })
        }

        function getWebsiteAddress(){
            var address = $location.host();
            return address.substring(address.indexOf('.') + 1);
        }
    }
})();