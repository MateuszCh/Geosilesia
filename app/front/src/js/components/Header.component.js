(function(){
    angular.module('geosilesia').component('header', {
        templateUrl: 'html/components/header.html',
        controllerAs: 'vm',
        controller: HeaderController
    });
    HeaderController.$inject = ['$location', '$scope', '$timeout', '$element', 'navigation'];
    function HeaderController($location, $scope, $timeout, $element, navigation){

        var vm = this;
        vm.$onInit = onInit;
        vm.openHam = openHam;
        vm.hamOpen = false;
        vm.activeGeo = false;
        var previousScroll = 0;
        var element;
        var searchElement = document.getElementById('search');

        function onInit(){
            vm.nav = navigation.nav;
            $scope.$on("$routeChangeSuccess", setCurrentPath);
            window.addEventListener('scroll', hideHeader);
            window.addEventListener('resize', resetHeader);
            element = $element[0].firstChild;
        }

        function setCurrentPath() {
            vm.currentPath = $location.path();
            if(vm.currentPath === '/'){
                vm.activeGeo = false;
                vm.hamOpen = false;
            }
            var counter = 0, i, position;
            for(i = 0; i < vm.currentPath.length; i++){
                if(vm.currentPath[i] === '/'){
                    counter++;
                    if(counter === 2){
                        position = i;
                    }
                }
            }
            if(counter === 2){
                vm.currentPath = vm.currentPath.substr(0, position);
            }
        }

        function openHam(link) {
            if(link){
                vm.activeGeo = link.subtitle;
            }
            if(window.innerWidth < 568){
                return vm.hamOpen ? vm.hamOpen = false : vm.hamOpen = true;
            }

        }

        function resetHeader(){
            vm.hamOpen = false;
            vm.noTransition = true;
            $timeout(function(){
                vm.noTransition = false;
            }, 500);
        }
        function hideHeader(){
            console.log($element[0].firstChild);
            var currentScroll = window.scrollY;
            vm.hideHeader = (((previousScroll < currentScroll) && (currentScroll * 2 > window.innerHeight)) || (!!searchElement && (currentScroll > window.innerHeight - element.offsetHeight)));
            vm.hideHeader ? element.classList.add('header--hidden') : element.classList.remove('header--hidden');
            previousScroll = currentScroll;
        }
    }
})();
