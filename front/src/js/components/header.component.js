(function() {
    angular.module("geosilesia").component("header", {
        templateUrl: "html/components/header.html",
        controllerAs: "vm",
        controller: HeaderController
    });
    HeaderController.$inject = [
        "$location",
        "$scope",
        "$timeout",
        "pwaService",
        "resourceService"
    ];
    function HeaderController(
        $location,
        $scope,
        $timeout,
        pwaService,
        resourceService
    ) {
        var vm = this;
        vm.$onInit = onInit;
        vm.openHam = openHam;
        vm.hamOpen = false;
        vm.activeGeo = false;

        vm.navigationLoaded = false;

        function onInit() {
            $scope.$on("$routeChangeSuccess", setCurrentPath);
            window.addEventListener("resize", resetHeader);

            if (pwaService.isAvailable()) {
                resourceService
                    .loadModelsFromIDB("posts", "navigation")
                    .then(function(response) {
                        if (!vm.navigationLoaded && response) {
                            onLoad(response);
                        }
                    });
            }
            resourceService
                .loadModelsFromNetwork("posts", "navigation")
                .then(function(response) {
                    if (response.data) {
                        vm.navigationLoaded = true;
                        onLoad(response.data);
                    }
                });
        }

        function onLoad(data) {
            if (data && data[0] && data[0].data && data[0].data.nav) {
                vm.nav = data[0].data.nav;
            }
        }

        function setCurrentPath() {
            vm.currentPath = $location.path();
            if (vm.currentPath === "/") {
                vm.activeGeo = false;
                vm.hamOpen = false;
            }
            var counter = 0,
                i,
                position;
            for (i = 0; i < vm.currentPath.length; i++) {
                if (vm.currentPath[i] === "/") {
                    counter++;
                    if (counter === 2) {
                        position = i;
                    }
                }
            }
            if (counter === 2) {
                vm.currentPath = vm.currentPath.substr(0, position);
            }
        }

        function openHam(link) {
            if (link) {
                vm.activeGeo = link.subtitle;
            }
            if (window.innerWidth < 568) {
                return vm.hamOpen ? (vm.hamOpen = false) : (vm.hamOpen = true);
            }
        }

        function resetHeader() {
            vm.hamOpen = false;
            vm.noTransition = true;
            $timeout(function() {
                vm.noTransition = false;
            }, 500);
        }
    }
})();
