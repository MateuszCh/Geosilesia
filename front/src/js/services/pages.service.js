(function() {
    angular.module("geosilesia").service("pagesService", [
        "requestService",
        "pwaService",
        function(requestService, pwaService) {
            var _loadedPages = {};

            function loadPage(url) {
                if (checkIfLoaded(url)) {
                    return _loadedPages[url].page;
                }
                if (pwaService.isAvailable()) {
                    return loadPageFromIDB(url || "/")
                        .then(function(response) {
                            if (response) {
                                return response;
                            } else {
                                return loadPageFromNetwork(url);
                            }
                        })
                        .catch(function() {
                            return loadPageFromNetwork(url);
                        });
                } else {
                    return loadPageFromNetwork(url);
                }
            }

            function loadPageFromIDB(url) {
                return pwaService.getPage(url);
            }

            function loadPageFromNetwork(url) {
                if (checkIfLoaded(url)) {
                    return _loadedPages[url].page;
                }
                var correctUrl = url.replace(/\//g, "%2F");
                return requestService
                    .send("/api/page/" + correctUrl, "GET")
                    .then(function(response) {
                        if (response.data && response.data[0]) {
                            _loadedPages[url] = {
                                loaded: true,
                                page: response.data[0]
                            };
                            return _loadedPages[url].page;
                        }
                        return;
                    })
                    .catch(function() {
                        return;
                    });
            }

            function checkIfLoaded(url) {
                return _loadedPages[url] && _loadedPages[url].loaded;
            }

            return {
                loadPage: loadPage,
                loadPageFromIDB: loadPageFromIDB,
                loadPageFromNetwork: loadPageFromNetwork
            };
        }
    ]);
})();
