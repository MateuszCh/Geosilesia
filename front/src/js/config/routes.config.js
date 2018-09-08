(function() {
    angular.module("geosilesia").config([
        "$routeProvider",
        function($routeProvider) {
            var originalWhen = $routeProvider.when;

            $routeProvider.when = function(path, route) {
                route.resolve || (route.resolve = {});
                angular.extend(route.resolve, {
                    page: [
                        "$route",
                        "$q",
                        "pwaService",
                        "resourceService",
                        function($route, $q, pwaService, resourceService) {
                            var url = $route.current.params.page || "/";
                            return $q(function(resolve, reject) {
                                var loadedModels = resourceService.getLoadedModels(
                                    "page",
                                    url
                                );
                                if (loadedModels) {
                                    resolve(loadedModels);
                                } else {
                                    if (pwaService.isAvailable()) {
                                        resourceService
                                            .loadModelsFromIDB("page", url)
                                            .then(function(response) {
                                                if (response) {
                                                    resolve(response);
                                                } else {
                                                    resourceService
                                                        .loadModelsFromNetwork(
                                                            "page",
                                                            url
                                                        )
                                                        .then(function(
                                                            response
                                                        ) {
                                                            resolve(response);
                                                        });
                                                }
                                            });
                                    } else {
                                        resourceService
                                            .loadModelsFromNetwork("page", url)
                                            .then(function(response) {
                                                resolve(response);
                                            });
                                    }
                                }
                            });
                        }
                    ]
                });
                return originalWhen.call($routeProvider, path, route);
            };

            $routeProvider
                .when("/", {
                    template: '<page-view page="page"></page-view>',
                    controller: [
                        "page",
                        "$scope",
                        function(page, $scope) {
                            $scope.page = page;
                        }
                    ]
                })
                .when("/:page*", {
                    template: '<page-view page="page"></page-view>',
                    controller: [
                        "page",
                        "$scope",
                        function(page, $scope) {
                            $scope.page = page;
                        }
                    ]
                });
        }
    ]);
})();
