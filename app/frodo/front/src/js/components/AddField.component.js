(function(){
    angular.module('frodo').component('addField', {
        templateUrl: 'html/components/add-field.html',
        controllerAs: 'vm',
        bindings: {
            model: '=',
            order: '@'
        },
        controller: AddFieldController
    });

    AddFieldController.$inject = ['$element', 'fields', '$rootScope', '$scope'];
    function AddFieldController($element, fields, $rootScope, $scope){
        var vm  = this;
        vm.setFieldType = setFieldType;
        vm.remove = remove;
        vm.showTypes = false;

        vm.fieldData = {
          type: undefined,
          title: undefined,
          id: undefined
        };

        vm.$onInit = function(){
            vm.fields = fields;
            $scope.$on('fieldRemoved', function(e, position){
               if(position <  vm.fieldData.order){
                   vm.fieldData.order--;
               }
            });
            vm.fieldData.order = parseInt(vm.order);
            vm.model.fields.push(vm.fieldData);
            for(var prop in vm.fields){
                if(vm.fields.hasOwnProperty(prop)){
                    vm.fieldData.type = vm.fields[prop].type;
                    vm.currentFieldType = vm.fields[prop];
                    break;
                }
            }
        };

        function setFieldType(type){
            if(vm.fieldData.type === type){
                return;
            }
            for(var prop in vm.fields){
                if(vm.fields[prop].type === type){
                    vm.currentFieldType = vm.fields[prop];
                }
            }

            vm.fieldData.type = type;
        }

        function remove(){
            $rootScope.$broadcast('fieldRemoved', vm.fieldData.order);
            vm.model.fields.splice(vm.fieldData.order, 1);
            $element.remove();
        }

    }
})();