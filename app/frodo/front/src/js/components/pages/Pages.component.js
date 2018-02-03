(function(){
    angular.module('frodo').component('pages', {
        templateUrl: 'html/components/pages/pages.html',
        controllerAs: 'vm',
        controller: PagesController
    });

    PagesController.$inject = [];
    function PagesController(){
        var vm  = this;

    }
})();