(function() {
    angular.module("geosilesia").service("pwaService", function() {
        var dbPromise = idb.open("geosilesia", 1, function(db) {
            if (!db.objectStoreNames.contains("pages")) {
                db.createObjectStore("pages", { keyPath: "pageUrl" });
            }
            if (!db.objectStoreNames.contains("posts")) {
                db.createObjectStore("posts", { keyPath: "id" });
            }
        });

        function getPage(url) {
            return dbPromise.then(function(db) {
                return db
                    .transaction("pages", "readonly")
                    .objectStore("pages")
                    .get(url);
            });
        }

        function getPosts(type) {
            return dbPromise.then(function(db) {
                return db
                    .transaction("posts", "readonly")
                    .objectStore("posts")
                    .getAll()
                    .filter(function(post) {
                        return post.type === type;
                    });
            });
        }

        function isAvailable() {
            return "serviceWorker" in navigator && "indexedDB" in window;
        }

        return {
            isAvailable: isAvailable,
            getPage: getPage,
            getPosts: getPosts
        };
    });
})();
