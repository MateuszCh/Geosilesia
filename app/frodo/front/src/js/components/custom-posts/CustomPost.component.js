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
            if(vm.edit){
                customPostsService.getById($routeParams.id)
                    .then(function(response){
                        vm.model = response.data;
                        customPostTypesService.getByType(vm.model.type)
                            .then(function(response){
                                vm.customPostType = response.data;
                            })
                            .catch(function(err){
                                $location.path('/');
                            })
                    })
                    .catch(function(err){
                        $location.path('/');
                    })
            } else {
                customPostTypesService.getByType($routeParams.type)
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


        function save(){
            $timeout.cancel(resultTimeout);

            setSaveStatus(true);

            var promise = vm.edit ? customPostsService.edit(vm.model._id, vm.model) : customPostsService.create(vm.model);

            promise
                .then(function(response){
                    if(vm.edit){
                        setSaveStatus(false, "Custom post updated successfully", response.status);
                        resultTimeout = $timeout(setSaveStatus, 10000);
                    } else {
                        $location.path('/custom-posts/' + vm.customPostType.id);
                    }
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