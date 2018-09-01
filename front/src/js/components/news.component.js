(function() {
    angular.module("geosilesia").component("news", {
        templateUrl: "html/components/news.html",
        controllerAs: "vm",
        controller: NewsController,
        bindings: {
            component: "<"
        }
    });

    NewsController.$inject = ["postsService", "pwaService"];
    function NewsController(postsService, pwaService) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            if (postsService.checkIfLoaded("wydarzenie")) {
                prepareEvents(postsService.getLoadedPosts("wydarzenie"));
            } else {
                if (pwaService.isAvailable()) {
                    postsService
                        .loadPostsFromIDB("wydarzenie")
                        .then(function(events) {
                            if (
                                !postsService.checkIfLoaded("wydarzenie") &&
                                events.length
                            ) {
                                prepareEvents(events);
                            }
                        });
                }
                postsService
                    .loadPostsFromNetwork("wydarzenie")
                    .then(function(events) {
                        if (events.length) {
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
