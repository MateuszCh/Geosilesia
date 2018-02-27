(function(){
    angular.module('frodo').service('postsService', ['requestService', function(requestService){

        function create(data){
            return requestService.send('/frodo/post', 'POST', data);
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
            edit: edit,
            getById: getById,
            remove: remove
        }

    }]);
})();
