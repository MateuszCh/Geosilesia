importScripts("/js/idb.js");

var CACHE_STATIC_NAME = "static-v13";
var CACHE_DYNAMIC_NAME = "dynamic-v13";
var STATIC_FILES = [
    "/",
    "index.html",
    "/css/main.css",
    "/js/app.min.js",
    "/js/idb.js",
    "manifest.json"
];

var dbPromise = idb.open("geosilesia", 1, function(db) {
    if (!db.objectStoreNames.contains("pages")) {
        db.createObjectStore("pages", { keyPath: "pageUrl" });
    }
    if (!db.objectStoreNames.contains("posts")) {
        db.createObjectStore("posts", { keyPath: "id" });
    }
});

function writeData(st, data) {
    return dbPromise.then(function(db) {
        var tx = db.transaction(st, "readwrite");
        var store = tx.objectStore(st);
        store.put(data);
        return tx.complete;
    });
}

self.addEventListener("install", function(event) {
    // console.log("[Service Worker] installing", event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME).then(function(cache) {
            // console.log("[Service Worker] Precaching App Shell");
            cache.addAll(STATIC_FILES);
        })
    );
});

self.addEventListener("activate", function(event) {
    // console.log("[Service Worker] activating", event);
    event.waitUntil(
        caches.keys().then(function(keysList) {
            return Promise.all(
                keysList.map(function(key) {
                    if (
                        key !== CACHE_STATIC_NAME &&
                        key !== CACHE_DYNAMIC_NAME
                    ) {
                        // console.log("[Service Worker] removing", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
    // console.log(event);
    if (event.request.url.indexOf("https://maps.") == 0) {
        // console.log("GMAP: ", event.request.url);
        event.respondWith(fetch(event.request));
    } else if (event.request.url.indexOf("/api") > -1) {
        // console.log("API: ", event.request.url);
        event.respondWith(
            fetch(event.request).then(function(res) {
                var clonedRes = res.clone();
                var typeOfRequest =
                    event.request.url.indexOf("/api/page") > -1
                        ? "pages"
                        : event.request.url.indexOf("/api/posts") > -1
                            ? "posts"
                            : "";
                if (typeOfRequest) {
                    clonedRes.json().then(function(data) {
                        for (var key in data) {
                            writeData(typeOfRequest, data[key]);
                        }
                    });
                }
                return res;
            })
        );
    } else {
        console.log(event);
        console.log(event.request.url);
        console.log(event.request.mode);
        event.respondWith(
            event.request.mode === "navigate"
                ? caches.match("index.html")
                : caches.match(event.request).then(function(response) {
                      return (
                          response ||
                          fetch(event.request).then(function(res) {
                              var cacheToOpen = isInArray(
                                  event.request.url,
                                  STATIC_FILES
                              )
                                  ? CACHE_STATIC_NAME
                                  : CACHE_DYNAMIC_NAME;
                              return caches
                                  .open(cacheToOpen)
                                  .then(function(cache) {
                                      if (
                                          event.request.url.indexOf("http") == 0
                                      ) {
                                          cache.put(
                                              event.request.url,
                                              res.clone()
                                          );
                                      }
                                      return res;
                                  });
                          })
                      );
                  })
        );
    }
});

function isInArray(string, array) {
    var cachePath;
    if (string.indexOf(self.origin) === 0) {
        // request targets domain where we serve the page from (i.e. NOT a CDN)
        // console.log("matched ", string);
        cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    } else {
        cachePath = string; // store the full request (for CDNs)
    }
    return array.indexOf(cachePath) > -1;
}
