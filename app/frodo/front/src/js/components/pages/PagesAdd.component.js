(function(){
    angular.module('frodo').component('newPage', {
        templateUrl: 'html/components/pages/pages-add.html',
        controllerAs: 'vm',
        controller: NewPageController
    });

    NewPageController.$inject = [];
    function NewPageController(){
        var vm  = this;

    }
})();