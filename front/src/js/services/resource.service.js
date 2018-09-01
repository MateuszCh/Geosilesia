(function() {
    angular.module("geosilesia").service("resourceService", [
        "requestService",
        "pwaService",
        function(requestService, pwaService) {
            var _loadedModels = {
                page: {},
                posts: {}
            };

            function getLoadedModels(resourceType, key) {
                return (
                    _loadedModels[resourceType] &&
                    _loadedModels[resourceType][key]
                );
            }

            function loadModelsFromIDB(resourceType, key) {
                if (resourceType === "page") {
                    return pwaService.getPage(key);
                } else if (resourceType === "posts") {
                    return pwaService.getPosts(key);
                }
            }

            function loadModelsFromNetwork(resourceType, key) {
                var formattedKey =
                    resourceType === "page" ? key.replace(/\//g, "%2F") : key;
                return requestService
                    .send("/api/" + resourceType + "/" + formattedKey, "GET")
                    .then(function(response) {
                        if (response.data && response.data[0]) {
                            _loadedModels[resourceType][key || "/"] =
                                resourceType === "page"
                                    ? response.data[0]
                                    : response.data;
                            return getLoadedModels(resourceType, key || "/");
                        }
                        return;
                    })
                    .catch(function() {
                        return;
                    });
            }

            return {
                getLoadedModels: getLoadedModels,
                loadModelsFromIDB: loadModelsFromIDB,
                loadModelsFromNetwork: loadModelsFromNetwork
            };
        }
    ]);
})();
