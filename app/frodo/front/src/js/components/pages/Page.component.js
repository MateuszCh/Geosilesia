(function(){
    angular.module('frodo').component('page', {
        templateUrl: 'html/components/pages/page.html',
        controllerAs: 'vm',
        controller: PageController
    });

    PageController.$inject = [];
    function PageController(){
        var vm  = this;

    }
})();