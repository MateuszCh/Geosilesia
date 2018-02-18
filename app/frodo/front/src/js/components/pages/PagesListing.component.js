(function(){
    angular.module('frodo').component('pagesListing', {
        templateUrl: 'html/components/pages/pages-listing.html',
        controllerAs: 'vm',
        controller: PagesListingController
    });

    PagesListingController.$inject = [];
    function PagesListingController(){
        var vm  = this;

    }
})();