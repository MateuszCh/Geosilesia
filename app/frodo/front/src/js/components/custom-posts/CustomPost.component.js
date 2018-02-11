(function(){
    angular.module('frodo').component('customPost', {
        templateUrl: 'html/components/custom-posts/custom-post.html',
        controllerAs: 'vm',
        bindings: {
            edit: '<'
        },
        controller: CustomPostController
    });

    CustomPostController.$inject = ['$scope', '$compile', 'customPostsService', 'customPostTypesService', '$rootScope', '$location', '$timeout', '$routeParams'];
    function CustomPostController($scope, $compile, customPostsService, customPostTypesService, $rootScope, $location, $timeout, $routeParams){
        var vm  = this;
        vm.$onInit = onInit;
        vm.save = save;
        var resultTimeout;

        vm.model = {
            title: "",
            type: "",
            data: {
            }
        };

        vm.saveStatus = {
            busy: false,
            result: "",
            status: undefined,
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


        function save(){
            $timeout.cancel(resultTimeout);

            setSaveStatus(true);

            customPostsService.create(vm.model)
                .then(function(response){
                    $location.path('/custom-posts/' + vm.customPostType.id);
                })
                .catch(function(err){
                    setSaveStatus(false, err.data.error, err.status);
                    resultTimeout = $timeout(setSaveStatus, 10000);
                })

        }

        function setSaveStatus(busy, result, status){
            vm.saveStatus = {
                busy: busy || false,
                result: result || "",
                status: status || 0
            }
        }

    }
})();