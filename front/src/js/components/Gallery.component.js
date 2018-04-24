(function(){
    angular.module('geosilesia').component('gallery', {
        templateUrl: 'html/components/gallery.html',
        controllerAs: 'vm',
        controller: GalleryController
    });

    GalleryController.$inject = ['$http', '$routeParams', '$rootScope', '$timeout'];

    function GalleryController($http, $routeParams, $rootScope, $timeout){
        var vm = this;
        vm.$onInit = onInit;
        vm.$onDestroy = onDestroy;
        vm.showFullMode = false;
        vm.openFullMode = openFullMode;
        vm.closeFullScreenMode = closeFullScreenMode;
        vm.next = next;
        vm.prev = prev;

        function onInit() {
            // $http.get('/api/gallery?id=' + $routeParams.galleryId).then(function(gallery){
            //     vm.gallery = gallery.data;
            //     vm.numberOfImages = vm.gallery.images.length;
            // });
            $http.get("json/galleries/" + $routeParams.galleryId + ".json").then(function (gallery) {
                vm.gallery = gallery.data;
                vm.numberOfImages = gallery.data.images.length;
            });

            window.addEventListener('keydown', setKeyEvent);

        }

        function onDestroy(){
            window.removeEventListener('keydown', setKeyEvent);
        }

        function setKeyEvent(e){
            if(e.defaultPrevented){
                return;
            }
            switch(e.key){
                case "ArrowLeft":
                    prev();
                    break;
                case "ArrowRight":
                    next();
                    break;
                case "Escape":
                    closeFullScreenMode();
                    break;
                default:
                    return;
            }
        }

        function openFullMode(img) {
            vm.noMove = true;
            vm.currentImage = img;
            $rootScope.blur = true;
            vm.nextImage = vm.currentImage + 1;
            vm.prevImage = vm.currentImage - 1;
            vm.show = true;
        }

        function closeFullScreenMode(){
            $rootScope.blur = false;
            vm.show = false;

            $timeout(function(){
                vm.currentImage = undefined;
                vm.nextImage = undefined;
                vm.prevImage = undefined;
            }, 500);
        }

        function next(){
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

        }

        function prev(){
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
            }, 100);
        }
    }
})();