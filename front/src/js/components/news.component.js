(function(){
    angular.module('geosilesia').component('news', {
            templateUrl: 'html/components/news.html',
            controllerAs: 'vm',
            controller: NewsController,
            bindings: {
                events: '<'
            }
        });

    NewsController.$inject = ['postsService'];
    function NewsController(postsService){
        var vm = this;
        vm.$onInit = onInit;
        function onInit(){
            vm.events = postsService.loadPosts('wydarzenie').reverse();
        }
    }
})();