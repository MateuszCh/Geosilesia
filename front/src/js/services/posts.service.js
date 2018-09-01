(function() {
    angular.module("geosilesia").service("postsService", [
        "requestService",
        "pwaService",
        function(requestService, pwaService) {
            var _loadedPosts = {};

            function getLoadedPosts(type) {
                return _loadedPosts[type] && _loadedPosts[type].posts;
            }

            function loadPostsFromIDB(type) {
                return pwaService.getPosts(type);
            }

            function loadPostsFromNetwork(type) {
                return requestService
                    .send("/api/posts/" + type, "GET")
                    .then(function(response) {
                        if (response.data && response.data[0]) {
                            _loadedPosts[type] = {
                                loaded: true,
                                posts: response.data
                            };
                            return _loadedPosts[type].posts;
                        }
                        return;
                    })
                    .catch(function() {
                        return;
                    });
            }

            function checkIfLoaded(type) {
                return _loadedPosts[type] && _loadedPosts[type].loaded;
            }

            return {
                loadPostsFromIDB: loadPostsFromIDB,
                loadPostsFromNetwork: loadPostsFromNetwork,
                getLoadedPosts: getLoadedPosts,
                checkIfLoaded: checkIfLoaded
            };
        }
    ]);
})();
