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
                            return pagesService.loadPage(
                                page.replace(/\//g, "%2F")
                            );
                        }
                    ]
                });
                return originalWhen.call($routeProvider, path, route);
            };

            $routeProvider
                .when("/", {
                    template: '<page-view page="page"></page-view>',
                    resolve: {
                        markers: [
                            "postsService",
                            function(postsService) {
                                return postsService.loadPosts("marker");
                            }
                        ],
                        icons: [
                            "postsService",
                            function(postsService) {
                                return postsService.loadPosts("icon");
                            }
                        ]
                    },
                    controller: [
                        "page",
                        "$scope",
                        function(page, $scope) {
                            $scope.page = page[0];
                        }
                    ]
                })
                .when("/wydarzenia", {
                    template: '<page-view page="page"></page-view>',
                    resolve: {
                        events: [
                            "postsService",
                            function(postsService) {
                                return postsService.loadPosts("wydarzenie");
                            }
                        ]
                    },
                    controller: [
                        "page",
                        "$scope",
                        function(page, $scope) {
                            $scope.page = page[0];
                        }
                    ]
                })
                .when("/:page*", {
                    template: '<page-view page="page"></page-view>',
                    controller: [
                        "page",
                        "$scope",
                        function(page, $scope) {
                            $scope.page = page[0];
                        }
                    ]
                })
                .otherwise("/");
        }
    ]);
})();
