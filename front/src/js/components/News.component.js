(function(){
    angular.module('geosilesia').component('news', {
            templateUrl: 'html/components/news.html',
            controllerAs: 'vm',
            controller: NewsController
        });

    NewsController.$inject = ['$http'];

    function NewsController($http) {
        var vm = this;
        vm.$onInit = onInit;

        function onInit() {
            // $http.get("/api/events").then(function (response) {
            //     vm.news = response.data.news;
            // });
            $http.get("json/events.json").then(function(response){
                vm.news = response.data.news;
            });
        }
    }
})();