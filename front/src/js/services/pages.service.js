(function(){
    angular.module('geosilesia').service('pagesService', ['requestService', function(requestService){

        var _pages = [];

        function loadPage(url){
            if(_pages[url]){
                return _pages[url];
            }
            return requestService.send('/api/page/' + url, 'GET')
                .then(function(response){
                    _pages[url] = response.data;
                    return _pages[url];
                })
                .catch(function(err){
                    console.log(err);
                    return _pages[url];
                })
        }

        return {
            loadPage: loadPage
        }

    }]);
})();