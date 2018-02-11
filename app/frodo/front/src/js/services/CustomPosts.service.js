(function(){
    angular.module('frodo').service('customPostsService', ['requestService', function(requestService){

        function getById(id){
            return requestService.send('/frodo/customPostType/' + id, 'GET');
        }

        function removeById(id){
            return requestService.send('/frodo/customPostType/' + id, 'DELETE');
        }

        function create(data){
            return requestService.send('/frodo/customPostType', 'POST', data);
        }

        function edit(id, data){
            return requestService.send('/frodo/customPostType/edit/' + id, 'PUT', data);
        }

        return {
            getAll: getAll,
            removeById: removeById,
            create: create,
            getById: getById,
            edit: edit
        }

    }]);
})();