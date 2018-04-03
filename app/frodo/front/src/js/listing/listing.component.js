(function(){
    angular.module('frodo').component('listing', {
        templateUrl: 'html/components/listing/listing.html',
        controllerAs: 'vm',
        bindings: {
            model: '<'
        },
        controller: ListingController
    });

    ListingController.$inject = ['$filter', 'listingFactory'];
    function ListingController($filter, listingFactory){
        var vm = this;
        vm.$onInit = onInit;

        function onInit(){
            vm.listing = listingFactory.create(vm.model);
        }

    }
})();