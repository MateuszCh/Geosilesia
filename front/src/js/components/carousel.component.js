(function () {
    angular.module('geosilesia').component('carousel', {
        templateUrl: 'html/components/carousel.html',
        controllerAs: 'vm',
        controller: CarouselController,
        bindings: {
            slides: "<",
            custom: '<',
            interval: "@",
            transition: "@"
        }
    });

    CarouselController.$inject = ["$interval", "$scope"];
    function CarouselController($interval, $scope){
        var vm = this;
        vm.$onInit = onInit;
        vm.goTo = goTo;
        vm.swipeTo = swipeTo;
        vm.setInt = setInt;
        vm.cancelInt = cancelInt;
        vm.currentSlide = currentSlide;
        var interval = undefined;
        var numberOfSlides = 0;

        vm.left = 0;

        function onInit() {
            numberOfSlides = vm.slides.length;
            vm.maxLeft = numberOfSlides * -100;
            setInt();
        }

        function setTransition(to){
            var slidesElements = document.getElementsByClassName("carousel__slide");
            var slidesLength = slidesElements.length;
            for(var i = 0; i < slidesLength; i++){
                if(to){
                    slidesElements[i].style.transition = "";
                } else {
                    slidesElements[i].style.transition = "none";
                }
            }
        }

        function currentSlide(){
            return -vm.left / 100;
        }

        function goTo(index, noTransition){
            noTransition && setTransition();
            if(vm.left !== index * -100){
                vm.left = index * -100;
            }
            if(noTransition){
                $scope.$apply();
            }

            if(noTransition){
                setTimeout(function(){
                    setTransition(true);
                }, 10);
            }

            if(index === -1){
                setTimeout(function(){
                    goTo(numberOfSlides - 1, true);
                }, parseInt(vm.transition));
            } else if(index === numberOfSlides){
                setTimeout(function(){
                    goTo(0, true);
                }, parseInt(vm.transition));
            }
        }

        function swipeTo(index){
            if(numberOfSlides > 1){
                cancelInt();
                var target = undefined;
                if(index < -1){
                    target = numberOfSlides - 1;
                } else if (index > numberOfSlides){
                    target = 0;
                } else {
                    target = index;
                }
                goTo(target);
                setInt();
            }
        }

        function setInt(){
            if(vm.slides && (numberOfSlides > 1) && vm.interval && parseInt(vm.interval)){
                interval = $interval(function(){
                    swipeTo(currentSlide() + 1);
                }, parseInt(vm.interval) * 1000);
            }
        }

        function cancelInt(){
            if(interval) $interval.cancel(interval);
        }

    }

})();