(function(){
    angular.module('geosilesia').component('pageView', {
        templateUrl: 'html/components/page-view.html',
        controllerAs: 'vm',
        controller: PageViewController,
        bindings: {
            page: '<'
        }
    });

    PageViewController.$inject = ['$location'];

    function PageViewController($location){
        var vm = this;
        vm.$onInit = onInit;

        function onInit(){

            if(!vm.page || !vm.page.pageUrl) $location.path('/');
        }
    }
})();