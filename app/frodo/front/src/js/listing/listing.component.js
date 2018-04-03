(function(){
    angular.module('frodo').component('listing', {
        templateUrl: 'html/components/listing/listing.html',
        controllerAs: 'vm',
        bindings: {
            model: '<'
        },
        controller: ListingController
    });

    ListingController.$inject = ['$filter', 'listingFactory', '$mdSidenav'];
    function ListingController($filter, listingFactory, $mdSidenav){
        var vm = this;
        vm.$onInit = onInit;
        vm.openFilters = openFilters;

        function onInit(){
            vm.listing = listingFactory.create(vm.model);
        }

        function openFilters(){
            $mdSidenav('filters').open();
        }

    }
})();