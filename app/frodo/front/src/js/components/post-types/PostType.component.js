(function(){
    angular.module('frodo').component('postType', {
        templateUrl: 'html/components/post-types/post-type.html',
        controllerAs: 'vm',
        bindings: {
            edit: '<'
        },
        controller: PostTypeController
    });

    PostTypeController.$inject = ['$scope', '$compile', 'postTypesService', '$rootScope', '$location', '$timeout', '$routeParams', 'tools'];
    function PostTypeController($scope, $compile, postTypesService, $rootScope, $location, $timeout, $routeParams, tools){
        var vm  = this;
        var resultTimeout;
        var fieldsElement = angular.element(document.querySelector('#postFields'));
        vm.$onInit = onInit;
        vm.save = save;
        vm.remove = remove;
        vm.addField = addField;
        vm.formatTypeString = formatTypeString;

        vm.actionStatus = {
            busy: false,
            result: "",
            status: undefined,
        };

        vm.model = {
            title: '',
            pluralTitle: '',
            type: '',
            fields: [],
            posts: []
        };

        function onInit(){
            if(vm.edit){
                postTypesService.getById($routeParams.id)
                    .then(function(response){
                        if(!response.data){
                            $location.path('/post-types');
                        } else {
                            vm.model = response.data;
                            vm.currentType = vm.model.type;
                            vm.fieldsNumber = new Array(vm.model.fields.length);
                        }
                    })
                    .catch(function(){
                        $location.path('/post-types');
                    })
            }
        }

        function addField(){
            var html = '<add-field model="vm.model.fields"></add-field>';
            var newField = $compile(html)($scope);
            fieldsElement.append(newField);
        }

        function formatTypeString(){
            if(vm.model.type){
                vm.model.type = vm.model.type.replace(/\s+/g, "_").toLowerCase();
            }
        }

        function save(){
            $timeout.cancel(resultTimeout);
            if(!tools.showInvalidInputs()){
                setActionStatus('save');
                var promise = vm.edit ? postTypesService.edit(vm.model._id, vm.model) : postTypesService.create(vm.model);

                promise
                    .then(function(response){
                        $rootScope.$broadcast('postTypesUpdated');
                        if(vm.edit){
                            vm.model = response.data;
                            vm.currentType = vm.model.type;
                            setActionStatus(false, vm.model.type +  " type updated successfully", response.status);
                            resultTimeout = $timeout(setActionStatus, 10000);
                        } else {
                            $location.path('/post-types');
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
            postTypesService.remove(vm.model._id)
                .then(function(){
                    setActionStatus();
                    $rootScope.$broadcast('postTypesUpdated');
                    $location.path('/post-types');
                })
                .catch(function(err){
                    setActionStatus(false, 'There was error removing ' + vm.model.type + ' post type.', err.status);
                    resultTimeout = $timeout(setActionStatus, 10000);
                })
        }

        function setActionStatus(type, result, status){
            vm.actionStatus = {
                busyType: type || false,
                result: result || "",
                status: status || undefined
            }
        }

    }
})();