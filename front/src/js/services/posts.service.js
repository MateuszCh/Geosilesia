(function(){
    angular.module('geosilesia').service('postsService', ['requestService', function(requestService){

        var _posts = [];

        function loadPosts(type){
            if(_posts[type]){
                return _posts[type];
            }
            return requestService.send('/api/posts/' + type, 'GET')
                .then(function(response){
                    _posts[type] = response.data;
                    return _posts[type];
                })
                .catch(function(err){
                    console.log(err);
                    return _posts[type];
                })
        }

        return {
            loadPosts: loadPosts
        }

    }]);
})();