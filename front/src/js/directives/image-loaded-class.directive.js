(function() {
    angular.module("geosilesia").directive("imageLoaded", function() {
        return {
            restrict: "A",
            link: link,
            scope: {
                imageLoaded: "@"
            }
        };
        function link(scope, element) {
            if (scope.imageLoaded) {
                var img = element.find("img");
                img.bind("load", function() {
                    element.addClass(scope.imageLoaded);
                });
            }
        }
    });
})();
