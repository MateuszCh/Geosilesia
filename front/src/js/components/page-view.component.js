(function() {
    angular.module("geosilesia").component("pageView", {
        templateUrl: "html/components/page-view.html",
        controllerAs: "vm",
        controller: PageViewController,
        bindings: {
            page: "<"
        }
    });

    PageViewController.$inject = ["$location", "pagesService", "pwaService"];

    function PageViewController($location, pagesService, pwaService) {
        var vm = this;
        vm.$onInit = onInit;

        function onInit() {
            if (pwaService.isAvailable()) {
                var path = $location.path().substring(1) || "/";
                var page = pagesService.loadPageFromNetwork(path);
                if (typeof page.then === "function") {
                    page.then(function(response) {
                        onLoad(response);
                    }).catch(function(err) {
                        onLoad();
                    });
                } else {
                    onLoad(page);
                }
            } else {
                onLoad();
            }
        }

        function onLoad(page) {
            if (page && page.pageUrl) {
                vm.page = page;
            }
            if (!vm.page || !vm.page.pageUrl) {
                $location.path("/");
            }
        }
    }
})();
