(function(){
    angular.module('geosilesia').component('fullscreenImage', {
        templateUrl: 'html/views/fullscreen-image.html',
        bindings: {
            custom: '<',
            images: '<',
            activeSlide: '<',
            show : '='
        },
        controllerAs: 'vm',
        controller: fullscreenImage
    });

    fullscreenImage.$inject = ['$rootScope', '$timeout'];

    function fullscreenImage($rootScope, $timeout) {
        var vm = this;
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.closeFullScreenMode = closeFullScreenMode;

        function closeFullScreenMode(){
            $rootScope.blur = false;
            vm.show = false;
        }

        vm.next = function(){
            vm.back = false;
            $timeout(function(){
                vm.noMove = false;
                if((vm.currentImage + 1) === vm.numberOfImages){
                    vm.currentImage = 0;
                    vm.nextImage = 1;
                    vm.prevImage = vm.numberOfImages - 1;
                } else {
                    vm.currentImage++;
                    if((vm.currentImage + 1) === vm.numberOfImages){
                        vm.nextImage = 0;
                        vm.prevImage = vm.numberOfImages - 2;
                    } else {
                        vm.nextImage = vm.currentImage + 1;
                        vm.prevImage = vm.currentImage - 1;
                    }
                }
            }, 100);

        };

        vm.prev = function(){
            vm.back = true;
            vm.noMove = true;
            $timeout(function(){
                vm.noMove = false;
                if(vm.currentImage === 0){
                    vm.currentImage = (vm.numberOfImages - 1);
                    vm.nextImage = 0;
                    vm.prevImage = vm.currentImage - 1;
                } else {
                    vm.currentImage--;
                    if(vm.currentImage === 0){
                        vm.nextImage = 1;
                        vm.prevImage = (vm.numberOfImages - 1);
                    } else {
                        vm.nextImage = vm.currentImage + 1;
                        vm.prevImage = vm.currentImage - 1;
                    }

                }
            }, 10);

        };

        function onInit() {
            // vm.noMove = true;
        }

        function onChanges(changes){
            if(changes.images && changes.images.currentValue){
                vm.numberOfImages = changes.images.currentValue.length;
            }
            if(changes.activeSlide){
                vm.noMove = true;
                vm.currentImage = changes.activeSlide.currentValue;
                vm.nextImage = vm.currentImage + 1;
                vm.prevImage = vm.currentImage - 1;
            } else {
                vm.currentImage = 0;
            }
        }
    }
})();