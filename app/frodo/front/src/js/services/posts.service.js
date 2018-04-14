(function(){
    angular.module('frodo').service('postsService', ['requestService', function(requestService){

        function create(data){
            return requestService.send('/frodo/post', 'POST', data);
        }

        function importPosts(posts){
            return requestService.send('/frodo/import', 'POST', posts);
        }

        function exportPosts(postType){
            return requestService.send('/frodo/export/' + postType, 'GET');
        }

        function removeTmpFile(postType){
            return requestService.send('/frodo/removeTmpFile/' + postType, 'DELETE');
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
            removeTmpFile: removeTmpFile,
            edit: edit,
            getById: getById,
            remove: remove
        }

    }]);
})();
