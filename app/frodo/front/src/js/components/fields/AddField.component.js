(function(){
    angular.module('frodo').component('addField', {
        templateUrl: 'html/components/fields/add-field.html',
        controllerAs: 'vm',
        bindings: {
            model: '=',
            order: '<',
            edit: '<'
        },
        controller: AddFieldController
    });

    AddFieldController.$inject = ['$element', 'fields', '$rootScope', '$scope', '$compile'];
    function AddFieldController($element, fields, $rootScope, $scope, $compile){
        var vm  = this;
        vm.setFieldType = setFieldType;
        vm.remove = remove;
        vm.addRepeaterField = addRepeaterField;
        vm.formatIdString = formatIdString;

        var repeaterFieldsElement = $element[0].querySelectorAll('.repeaterFields')[0];

        vm.fieldModel = {
          type: undefined,
          title: undefined,
          id: undefined,
          selectOptions: undefined,
          repeaterFields: []
        };

        vm.$onInit = function(){
            vm.fields = fields;
            if(vm.edit){
                vm.fieldModel = vm.model[vm.order];
                setFieldType(vm.fieldModel.type, vm.fields[vm.fieldModel.type].name);

                if(vm.fieldModel.type === 'repeater'){
                    vm.repeaterFieldsNumber = new Array(vm.fieldModel.repeaterFields.length);
                }
            } else {
                vm.order = vm.model.push(vm.fieldModel) - 1;
                setFieldType('text', vm.fields.text.name);
            }
            $scope.$on('fieldRemoved', function(e, position){
                if(position < vm.order){
                    vm.order--;
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

        function addRepeaterField(){
            var html = '<add-field model="vm.fieldModel.repeaterFields"></add-field>';
            var newField = $compile(html)($scope);
            repeaterFieldsElement.append(newField[0]);
        }

        function formatIdString(){
            if(vm.fieldModel.id){
                vm.fieldModel.id = vm.fieldModel.id.replace(/\s+/g, "_").toLowerCase();
            }
        }

    }
})();