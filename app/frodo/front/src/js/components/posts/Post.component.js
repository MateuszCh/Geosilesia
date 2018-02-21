(function(){
    angular.module('frodo').component('post', {
        templateUrl: 'html/components/posts/post.html',
        controllerAs: 'vm',
        bindings: {
            edit: '<'
        },
        controller: PostController
    });

    PostController.$inject = ['$scope', '$compile', 'postsService', 'postTypesService', '$rootScope', '$location', '$timeout', '$routeParams'];
    function PostController($scope, $compile, postsService, postTypesService, $rootScope, $location, $timeout, $routeParams){
        var vm  = this;
        vm.$onInit = onInit;
        vm.save = save;
        vm.remove = remove;
        var resultTimeout;

        vm.model = {
            title: "",
            type: "",
            data: {
            }
        };

        vm.actionStatus = {
            busy: false,
            result: "",
            status: undefined,
        };

        function onInit(){
            if(vm.edit){
                postsService.getById($routeParams.id)
                    .then(function(response){
                        vm.model = response.data;
                        if(!vm.model.data){
                            vm.model.data = {};
                        }
                        postTypesService.getByType(vm.model.type)
                            .then(function(response){
                                vm.postType = response.data;
                                checkModel();
                            })
                            .catch(function(){
                                $location.path('/');
                            })
                    })
                    .catch(function(){
                        $location.path('/');
                    })
            } else {
                postTypesService.getByType($routeParams.type)
                    .then(function(response){
                        if(!response.data){
                            $location.path('/');
                            return;
                        }
                        vm.postType = response.data;
                        vm.model.type = vm.postType.type;

                    })
                    .catch(function(){
                        $location.path('/');
                    })
            }
        }

        function checkModel(){
            var validIds = [];
            vm.postType.fields.forEach(function(field){
                validIds.push(field.id);
            });
            if(vm.model.data){
                for (var prop in vm.model.data) {
                    if(validIds.indexOf(prop) < 0){
                        delete vm.model.data[prop];
                    }
                }
            }
        }

        function save(){
            $timeout.cancel(resultTimeout);
            setActionStatus('save');

            var promise = vm.edit ? postsService.edit(vm.model._id, vm.model) : postsService.create(vm.model);

            promise
                .then(function(response){
                    if(vm.edit){
                        vm.model = response.data;
                        setActionStatus(false, "Custom post updated successfully", response.status);
                        resultTimeout = $timeout(setActionStatus, 10000);
                    } else {
                        $location.path('/posts/' + vm.postType.type);
                    }
                })
                .catch(function(err){
                    setActionStatus(false, err.data.error, err.status);
                    resultTimeout = $timeout(setActionStatus, 10000);
                })
        }

        function remove(){
            $timeout.cancel(resultTimeout);
            setActionStatus('remove');
            postsService.remove(vm.model._id)
                .then(function(){
                    $location.path('/posts/' + vm.postType.type);
                })
                .catch(function(err){
                    setActionStatus(undefined, err.data.error, err.status);
                    resultTimeout = $timeout(setActionStatus, 10000);
                })
        }

        function setActionStatus(type, result, status){
            vm.actionStatus = {
                busyType: type || false,
                result: result || "",
                status: status || 0
            }
        }
    }
})();