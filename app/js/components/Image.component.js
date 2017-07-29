(function(){
    angular.module('geosilesia').component('fullscreenImage', {
        templateUrl: 'html/views/fullscreen-image.html',
        bindings: {
            custom: '<',
            images: '<',
            activeSlide: '<'
        },
        controllerAs: 'vm',
        controller: fullscreenImage
    });

    fullscreenImage.$inject = [];

    function fullscreenImage() {
        var vm = this;
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;

        vm.next = function(){
            if((vm.currentImage + 1) === vm.numberOfImages){
                vm.currentImage = 0;
            } else {
                vm.currentImage++;
            }
        };

        vm.prev = function(){
            if(vm.currentImage === 0){
                vm.currentImage = (vm.numberOfImages - 1);
            } else {
                vm.currentImage--;
            }
        };

        function onInit() {

        }

        function onChanges(changes){
            if(changes.images && changes.images.currentValue){
                vm.numberOfImages = changes.images.currentValue.length;
            }
            if(changes.activeSlide){
                vm.currentImage = changes.activeSlide.currentValue;
            } else {
                vm.currentImage = 0;
            }
        }
    }
})();