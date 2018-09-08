(function() {
    angular.module("geosilesia").component("news", {
        templateUrl: "html/components/news.html",
        controllerAs: "vm",
        controller: NewsController,
        bindings: {
            component: "<"
        }
    });

    NewsController.$inject = ["pwaService", "resourceService"];
    function NewsController(pwaService, resourceService) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            var loadedNews = resourceService.getLoadedModels(
                "posts",
                "wydarzenie"
            );

            if (loadedNews) {
                prepareEvents(loadedNews);
            } else {
                if (pwaService.isAvailable()) {
                    resourceService
                        .loadModelsFromIDB("posts", "wydarzenie")
                        .then(function(events) {
                            if (
                                !resourceService.getLoadedModels(
                                    "posts",
                                    "wydarzenie"
                                ) &&
                                events &&
                                events.length
                            ) {
                                prepareEvents(events);
                            }
                        });
                }
                resourceService
                    .loadModelsFromNetwork("posts", "wydarzenie")
                    .then(function(events) {
                        if (events && events.length) {
                            prepareEvents(events);
                        }
                    });
            }
        }

        function prepareEvents(events) {
            var now = new Date().getTime();
            vm.events = events
                .filter(function(event) {
                    if (!event.data.date_of_publication) {
                        return false;
                    }
                    var dateOfPublication = new Date(
                        event.data.date_of_publication
                    ).getTime();
                    return dateOfPublication < now;
                })
                .sort(function(a, b) {
                    return b.created - a.created;
                });
        }
    }
})();
