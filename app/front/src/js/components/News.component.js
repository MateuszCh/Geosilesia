(function(){
    angular.module('geosilesia').component('events', {
            templateUrl: 'html/components/news.html',
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
            $http.get("/api/events").then(function (response) {
                vm.news = response.data.news;
            });
        }
    }
})();