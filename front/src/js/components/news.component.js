(function(){
    angular.module('geosilesia').component('news', {
            templateUrl: 'html/components/news.html',
            controllerAs: 'vm',
            controller: NewsController,
            bindings: {
                component: '<'
            }
        });

    NewsController.$inject = ['postsService'];
    function NewsController(postsService){
        var vm = this;
        vm.$onInit = onInit;
        function onInit(){
            var events = postsService.loadPosts('wydarzenie');

            if(events.length){
                sortEvents(events)
            } else {
                events.then(function(response){
                    sortEvents(response);

                })
            }
        }

        function sortEvents(events){
            vm.events = events.sort(function(a,b){
                return new Date(b.data.date) - new Date(a.data.date);
            })
        }
    }
})();