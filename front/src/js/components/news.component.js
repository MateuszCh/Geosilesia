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
                prepareEvents(events)
            } else {
                events.then(function(response){
                    prepareEvents(response);
                })
            }
        }

        function prepareEvents(events){
            var now = (new Date()).getTime();
            vm.events = events.filter(function(event){
                if(!event.data.date_of_publication){
                    return false;
                }
                var dateOfPublication = (new Date(event.data.date_of_publication)).getTime();
                return dateOfPublication < now;
            }).sort(function(a,b){
                return b.created - a.created;
            })
        }
    }
})();