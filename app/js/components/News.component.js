(function(){
    angular.module('geosilesia').component('events', {
            templateUrl: 'html/views/news.html',
            bindings: {
                custom: '<'
            },
            controllerAs: 'vm',
            controller: NewsController
        });

    NewsController.$inject = ['$http'];

    function NewsController($http) {
        var vm = this;
        vm.news = [];
        vm.$onInit = onInit;

        function onInit() {
            $http.get("json/events.json").then(function (response) {
                vm.news = response.data.news;
                console.log(vm.news);
            });
        }

        vm.action = function (event) {
            var target = angular.element(event.currentTarget);
            var parent = angular.element(event.currentTarget.parentNode);
            parent.hasClass("border") ? thesame = false : thesame = true;

            angular.element(document.querySelectorAll("article")).removeClass('border');
            angular.element(document.querySelectorAll(".body")).removeClass("dol");

            if (thesame) {
                parent.addClass('border');
                target.next().addClass('dol');
            }
        }


    }

})();