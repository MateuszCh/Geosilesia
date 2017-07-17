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
    }
})();