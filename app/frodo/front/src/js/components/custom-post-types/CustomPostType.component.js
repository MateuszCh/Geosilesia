(function(){
    angular.module('frodo').component('customPostType', {
        templateUrl: 'html/components/custom-post-types/custom-post-type.html',
        controllerAs: 'vm',
        bindings: {
            edit: '<'
        },
        controller: CustomPostTypeController
    });

    CustomPostTypeController.$inject = ['$scope', '$compile', 'customPostTypesService', '$rootScope', '$location', '$timeout', '$routeParams'];
    function CustomPostTypeController($scope, $compile, customPostTypesService, $rootScope, $location, $timeout, $routeParams){
        var vm  = this;
        vm.$onInit = onInit;
        vm.save = save;
        vm.addField = addField;
        vm.formatTypeString = formatTypeString;
        var fieldsElement = angular.element(document.querySelector('#postFields'));

        vm.saveStatus = {
            busy: false,
            result: "",
            status: undefined,
        };
        var resultTimeout;

        vm.model = {
            title: '',
            pluralTitle: '',
            type: '',
            fields: []
        };

        function onInit(){
            if(vm.edit){
                customPostTypesService.getById($routeParams.id)
                    .then(function(response){
                        if(!response.data){
                            $location.path('/');
                            return;
                        }
                        vm.model = response.data;

                        vm.fieldsNumber = new Array(vm.model.fields.length);
                    })
                    .catch(function(err){
                        $location.path('/');
                    })
            }
        }

        function addField(){

            var html = '<add-field model="vm.model.fields"></add-field>';
            var newField = $compile(html)($scope);
            fieldsElement.append(newField);
        }

        function showInvalidInputs(){
            var invalidInputs = document.getElementsByClassName("ng-invalid");

            if(invalidInputs.length){
                invalidInputs[0].scrollIntoView({behavior: "smooth"});
                var collectionLength = invalidInputs.length;
                var i = 0;
                for(i; i < collectionLength; i++){
                    invalidInputs[i].parentNode.classList.add("invalid");
                }
            }
            return invalidInputs.length;
        }

        function formatTypeString(){
            vm.model.type = vm.model.type.replace(/\s+/g, "_").toLowerCase();
        }

        function save(){
            $timeout.cancel(resultTimeout);

            if(!showInvalidInputs()){
                setSaveStatus(true);
                var promise = vm.edit ? customPostTypesService.edit(vm.model._id, vm.model) : customPostTypesService.create(vm.model);

                promise
                    .then(function(response){
                        $rootScope.$broadcast('customPostTypesUpdated');
                        vm.submitted = false;
                        if(vm.edit){
                            setSaveStatus(false, "Custom post type updated successfully", response.status);
                            resultTimeout = $timeout(setSaveStatus, 10000);
                        } else {
                            $location.path('/custom-post-types');
                        }

                    })
                    .catch(function(err){
                        setSaveStatus(false, err.data.error, err.status);
                        resultTimeout = $timeout(setSaveStatus, 10000);
                    })
            }


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