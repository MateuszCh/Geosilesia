(function(){
    angular.module('frodo').component('repeater', {
        templateUrl: 'html/components/repeater.html',
        controllerAs: 'vm',
        bindings: {
            parentModel: '=',
            field: '<',
            repeaterFields: '<'
        },
        controller: RepeaterController
    });

    RepeaterController.$inject = [];
    function RepeaterController(){
        var vm  = this;

        vm.$onInit = onInit;
        vm.removeRow = removeRow;
        vm.addRow = addRow;

        function onInit(){
            if(!vm.parentModel[vm.field.id]){
                vm.parentModel[vm.field.id] = [];
            }
            vm.model = vm.parentModel[vm.field.id];
        }

        function removeRow(index){
            vm.model.splice(index, 1);
        }

        function addRow(){
            vm.model.push({});
        }

    }
})();