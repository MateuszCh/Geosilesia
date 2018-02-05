(function(){
    angular.module('frodo').component('addField', {
        templateUrl: 'html/components/add-field.html',
        controllerAs: 'vm',
        bindings: {
            model: '=',
            order: '<',
            edit: '<'
        },
        controller: AddFieldController
    });

    AddFieldController.$inject = ['$element', 'fields', '$rootScope', '$scope'];
    function AddFieldController($element, fields, $rootScope, $scope){
        var vm  = this;
        vm.setFieldType = setFieldType;
        vm.remove = remove;

        vm.fieldModel = {
          type: undefined,
          title: undefined,
          id: undefined,
          selectOptions: undefined
        };

        vm.$onInit = function(){
            vm.fields = fields;
            if(vm.edit){
                vm.fieldModel = vm.model[vm.order];
                setFieldType(vm.fieldModel.type, vm.fields[vm.fieldModel.type].name);
            } else {
                vm.order = vm.model.push(vm.fieldModel) - 1;
                setFieldType('text', vm.fields.text.name);
            }
            $scope.$on('fieldRemoved', function(e, position){
                if(position < vm.order){
                    vm.order--;
                    console.log(vm.order);
                }
            })
        };

        function setFieldType(type, name){
            vm.currentFieldTypeName = name;
            if(vm.fieldModel.type !== type){
                vm.fieldModel.type = type;
            }
        }

        function remove(){
            $rootScope.$broadcast('fieldRemoved', vm.order);
            vm.model.splice(vm.order, 1);
            $element.remove();
        }

    }
})();