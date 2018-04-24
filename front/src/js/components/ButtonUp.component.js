(function(){
    angular.module('geosilesia').component('buttonUp', {
        controllerAs: 'vm',
        controller: ButtonUpController,
        template: '<button class="button-up" du-smooth-scroll="page"><img class="button-up__image" src="images/arrow-up.png"></button>'
    });

    ButtonUpController.$inject = ['$element'];
    function ButtonUpController($element){
        var vm = this;
        vm.$onInit = onInit;
        var element;

        function onInit(){
            window.addEventListener('scroll', showButtonUp);
            element = $element[0].firstChild;
            showButtonUp();
        }

        function showButtonUp(){
            window.pageYOffset === 0 ? element.classList.add('ng-hide') : element.classList.remove('ng-hide');
        }
    }
})();