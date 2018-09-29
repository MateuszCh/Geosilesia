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
                if (path === "index.html") path = "/";
                resourceService
                    .loadModelsFromNetwork("page", path)
                    .then(function(response) {
                        if (
                            response.data &&
                            response.data &&
                            response.data.pages &&
                            response.data.pages.length
                        ) {
                            onLoad(response.data.pages[0]);
                        } else {
                            onLoad();
                        }
                    })
                    .catch(function() {
                        onLoad();
                    });
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
