(function() {
    angular.module("geosilesia").config([
        "$routeProvider",
        function($routeProvider) {
            var originalWhen = $routeProvider.when;

            $routeProvider.when = function(path, route) {
                route.resolve || (route.resolve = {});
                angular.extend(route.resolve, {
                    page: [
                        "pagesService",
                        "$route",
                        function(pagesService, $route) {
                            var page;
                            if (path === "/:page*") {
                                page = $route.current.params.page;
                            } else {
                                page = path.substring(1);
                            }
                            return pagesService.loadPage(page);
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
                })
                .otherwise("/");
        }
    ]);
})();
