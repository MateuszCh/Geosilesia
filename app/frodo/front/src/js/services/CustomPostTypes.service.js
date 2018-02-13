(function(){
    angular.module('frodo').service('customPostTypesService', ['requestService', function(requestService){

        function getAll(){
            return requestService.send('/frodo/customPostType', 'GET');
        }

        function getById(id){
            return requestService.send('/frodo/customPostType/' + id, 'GET');
        }

        function getByType(type){
            return requestService.send('/frodo/customPostTypeByType/' + type, 'GET');
        }

        function getByTypeWithPosts(type){
            return requestService.send('/frodo/customPostTypeByTypePosts/' + type, 'GET');
        }

        function getByIdWithPosts(id){
            return requestService.send('/frodo/customPostTypePosts/' + id, 'GET');
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
            edit: edit,
            getByIdWithPosts: getByIdWithPosts,
            getByType: getByType,
            getByTypeWithPosts: getByTypeWithPosts
        }

    }]);
})();