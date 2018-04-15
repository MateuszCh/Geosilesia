(function(){
    angular.module('frodo').service('postsService', ['requestService', function(requestService){

        function create(data){
            return requestService.send('/frodo/post', 'POST', data);
        }

        function importPosts(data){
            return requestService.send('/frodo/importPosts', 'POST', data);
        }

        function exportPosts(postType){
            return requestService.send('/frodo/exportPosts/' + postType, 'GET');
        }

        function edit(data){
            return requestService.send('/frodo/post/edit', 'PUT', data);
        }

        function getById(id){
            return requestService.send('/frodo/post/' + id, 'GET');
        }

        function remove(id){
            return requestService.send('/frodo/post/' + id, 'DELETE');
        }

        return {
            create: create,
            importPosts: importPosts,
            exportPosts: exportPosts,
            edit: edit,
            getById: getById,
            remove: remove
        }

    }]);
})();
