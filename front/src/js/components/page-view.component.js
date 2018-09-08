(function() {
    angular.module("geosilesia").component("pageView", {
        templateUrl: "html/components/page-view.html",
        controllerAs: "vm",
        controller: PageViewController,
        bindings: {
            page: "<"
        }
    });

    PageViewController.$inject = ["$location", "pwaService", "resourceService"];

    function PageViewController($location, pwaService, resourceService) {
        var vm = this;
        vm.$onInit = onInit;
        vm.pwaIsAvailable = pwaService.isAvailable();

        function onInit() {
            if (pwaService.isAvailable()) {
                var path = $location.path().substring(1) || "/";
                if (!resourceService.getLoadedModels("page", path)) {
                    resourceService
                        .loadModelsFromNetwork("page", path)
                        .then(function(response) {
                            onLoad(response);
                        });
                }
            } else {
                onLoad();
            }
        }

        function onLoad(page) {
            if (page && page.pageUrl) {
                vm.page = page;
            }
            vm.loaded = true;
        }
    }
})();
