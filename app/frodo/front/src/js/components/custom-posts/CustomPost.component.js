(function(){
    angular.module('frodo').component('customPost', {
        templateUrl: 'html/components/custom-posts/custom-post.html',
        controllerAs: 'vm',
        bindings: {
            edit: '<'
        },
        controller: CustomPostController
    });

    CustomPostController.$inject = ['$scope', '$compile', 'customPostTypesService', '$rootScope', '$location', '$timeout', '$routeParams'];
    function CustomPostController($scope, $compile, customPostTypesService, $rootScope, $location, $timeout, $routeParams){
        var vm  = this;
        vm.$onInit = onInit;

        vm.model = {
            title: "",
            type: "",
            data: {
            }
        };

        function onInit(){
            customPostTypesService.getById($routeParams.id)
                .then(function(response){
                    if(!response.data){
                        $location.path('/');
                        return;
                    }
                    vm.customPostType = response.data;
                    vm.model.type = vm.customPostType.type;

                })
                .catch(function(err){
                    $location.path('/');
                })
        }

    }
})();