(function(){
    angular.module('geosilesia').component('news', {
            templateUrl: 'html/components/news.html',
            controllerAs: 'vm',
            bindings: {
                events: '<'
            }
        });
})();