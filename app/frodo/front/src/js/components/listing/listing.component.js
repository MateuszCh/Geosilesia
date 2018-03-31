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
        vm.searchTextChange = searchTextChange;
        vm.searchModels = searchModels;
        function onInit(){
            vm.listing = listingFactory.create(vm.model);
        }

        function searchModels(searchText){
            return searchText ? $filter('filter')(vm.listing.models, searchText.toLowerCase()) : vm.listing.models;
        }

        function searchTextChange(text){
            vm.filter = text;
        }

    }
})();