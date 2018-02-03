(function(){
    angular.module('frodo').component('customPostTypesAdd', {
        templateUrl: 'html/components/custom-post-types/custom-post-types-add.html',
        controllerAs: 'vm',
        controller: CustomPostTypesAddController
    });

    CustomPostTypesAddController.$inject = ['$scope', '$compile', 'customPostTypesService', '$rootScope', '$location', '$timeout'];
    function CustomPostTypesAddController($scope, $compile, customPostTypesService, $rootScope, $location, $timeout){
        var vm  = this;
        vm.save = save;
        vm.addField = addField;
        var fieldsElement = angular.element(document.querySelector('#postFields'));
        vm.fieldsCount = 0;
        vm.saveStatus = {
            busy: false
        };
        var resultTimeout;

        vm.data = {
            title: '',
            type: '',
            fields: []
        };

        function addField(){
            vm.fieldsCount++;
            var newField = $compile('<add-field model="vm.data" order="{{vm.fieldsCount - 1}}"></add-field>')($scope);
            fieldsElement.append(newField);
        }

        function save(){
            vm.saveStatus.busy = true;
            if(vm.result){
                removeResult();
            }
            $timeout.cancel(resultTimeout);
            customPostTypesService.create(vm.data)
                .then(function(response){
                    vm.saveStatus.busy = false;
                    $rootScope.$broadcast('customPostTypesUpdated');
                    $location.path('/custom-post-types');
                })
                .catch(function(err){
                    vm.saveStatus.busy = false;
                    vm.result = err.data.error;

                    resultTimeout = $timeout(removeResult, 10000);
                })
        }

        function removeResult(){
            vm.result = "";
        }
    }
})();