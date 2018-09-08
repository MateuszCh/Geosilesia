(function() {
    angular.module("geosilesia").run([
        "pwaService",
        function(pwaService) {
            if (pwaService.isAvailable()) {
                navigator.serviceWorker
                    .register("./sw.js")
                    .then(function() {
                        // console.log("Service worker registered!");
                    })
                    .catch(function(err) {
                        // console.log(err);
                    });
            }
        }
    ]);
})();
