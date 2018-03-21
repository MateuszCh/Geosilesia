(function(){
    angular.module('frodo').component('post', {
        templateUrl: 'html/components/posts/post.html',
        controllerAs: 'vm',
        bindings: {
            post: '<',
            postType: '<'
        },
        controller: PostController
    });

    PostController.$inject = ['$scope', '$compile', 'postsService', 'postTypesService', '$rootScope', '$location', '$timeout', 'tools', '$state'];
    function PostController($scope, $compile, postsService, postTypesService, $rootScope, $location, $timeout, tools, $state){
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
            if($state.current.name === 'postsEdit') vm.edit = true;
            vm.postType = vm.postType.data;
            if(vm.edit){
                vm.model = vm.post.data;
                if(!vm.model.data){
                    vm.model.data = {};
                }
                checkModel();
            } else {
                vm.model.type = vm.postType.type;
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

            if(!tools.showInvalidInputs()){
                setActionStatus('save');

                var promise = vm.edit ? postsService.edit(vm.model) : postsService.create(vm.model);

                promise
                    .then(function(response){
                        if(vm.edit){
                            vm.model = response.data;
                            setActionStatus(false, "Custom post updated successfully", response.status);
                            resultTimeout = $timeout(setActionStatus, 10000);
                        } else {
                            $location.path(response.data.url);
                        }
                    })
                    .catch(function(err){
                        setActionStatus(false, err.data.error, err.status);
                        resultTimeout = $timeout(setActionStatus, 10000);
                    })
            }

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