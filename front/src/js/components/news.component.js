(function(){
    angular.module('geosilesia').component('news', {
            templateUrl: 'html/components/news.html',
            controllerAs: 'vm',
            controller: NewsController
        });

    NewsController.$inject = ['postsService'];
    function NewsController(postsService){
        var vm = this;
        vm.$onInit = onInit;
        function onInit(){
            var events = postsService.loadPosts('wydarzenie').reverse();

            vm.events = events.sort(function(a,b){
                return new Date(b.data.date) - new Date(a.data.date);
            })
        }
    }
})();