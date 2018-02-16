(function(){
    angular.module('frodo').component('field', {
        templateUrl: 'html/components/field.html',
        controllerAs: 'vm',
        bindings: {
            model: '=',
            field: '<',
        },
        controller: FieldController
    });

    FieldController.$inject = [];
    function FieldController(){
        var vm  = this;

    }
})();