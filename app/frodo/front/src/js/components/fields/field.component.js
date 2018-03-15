(function(){
    angular.module('frodo').component('field', {
        templateUrl: 'html/components/fields/field.html',
        controllerAs: 'vm',
        bindings: {
            model: '=',
            field: '<',
        },
        controller: FieldController
    });

    FieldController.$inject = ['$scope'];
    function FieldController($scope){
        var vm  = this;
        vm.showFilePopup = false;

        vm.$onInit = onInit;

        function onInit(){
            $scope.$on('fileChoosen', function(){
                vm.showFilePopup = false;
            })
        }

    }
})();