(function(){
    angular.module('frodo').component('component', {
        templateUrl: 'html/components/components/component.html',
        controllerAs: 'vm',
        bindings: {
            edit: '<'
        },
        controller: ComponentController
    });

    ComponentController.$inject = ['$scope', '$compile', 'componentsService', '$location', '$timeout', 'tools', '$state'];
    function ComponentController($scope, $compile, componentsService, $location, $timeout, tools, $state){
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
            type: '',
            fields: []
        };

        function onInit(){
            if(vm.edit){
                componentsService.getById($state.params.id)
                    .then(function(response){
                        if(!response.data){
                            $location.path('/components');
                        } else {
                            vm.model = response.data;
                            vm.currentType = vm.model.type;
                            vm.fieldsNumber = new Array(vm.model.fields.length);
                        }
                    })
                    .catch(function(){
                        $location.path('/components');
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
                var promise = vm.edit ? componentsService.edit(vm.model._id, vm.model) : componentsService.create(vm.model);

                promise
                    .then(function(response){
                        if(vm.edit){
                            vm.model = response.data;
                            vm.currentType = vm.model.type;
                            setActionStatus(false, vm.model.type +  " component updated successfully", response.status);
                            resultTimeout = $timeout(setActionStatus, 10000);
                        } else {
                            $location.path('/components');
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
            componentsService.remove(vm.model._id)
                .then(function(){
                    setActionStatus();
                    $location.path('/components');
                })
                .catch(function(err){
                    setActionStatus(false, 'There was error removing ' + vm.model.type + ' component.', err.status);
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