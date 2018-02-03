(function(){
    angular.module('frodo').component('customPostTypesEdit', {
        templateUrl: 'html/components/custom-post-types/custom-post-types-edit.html',
        controllerAs: 'vm',
        controller: CustomPostTypesEditController
    });

    CustomPostTypesEditController.$inject = ['$routeParams', 'customPostTypesService', '$location'];
    function CustomPostTypesEditController($routeParams, customPostTypesService, $location){
        var vm  = this;
        vm.$onInit = onInit;

        function onInit(){
            customPostTypesService.getByType($routeParams.type)
                .then(function(response){
                    if(!response.data.length){
                        $location.path('/');
                        return;
                    }
                    vm.customPostType = response.data;
                })
                .catch(function(err){
                    $location.path('/');
                })
        }

    }
})();

