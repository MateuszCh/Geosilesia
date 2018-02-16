(function(){
    angular.module('frodo').service('postsService', ['requestService', function(requestService){

        function create(data){
            return requestService.send('/frodo/post', 'POST', data);
        }

        function removeById(id){
            return requestService.send('/frodo/post/' + id, 'DELETE');
        }

        function getById(id){
            return requestService.send('/frodo/post/' + id, 'GET');
        }

        function edit(id, data){
            return requestService.send('/frodo/post/edit/' + id, 'PUT', data);
        }

        return {
            create: create,
            removeById: removeById,
            getById: getById,
            edit: edit
        }

    }]);
})();
