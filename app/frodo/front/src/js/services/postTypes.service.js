(function(){
    angular.module('frodo').service('postTypesService', ['requestService', function(requestService){

        function create(data){
            return requestService.send('/frodo/postType', 'POST', data);
        }

        function edit(data){
            return requestService.send('/frodo/postType/edit', 'PUT', data);
        }

        function getAll(){
            return requestService.send('/frodo/postType', 'GET');
        }

        function getById(id){
            return requestService.send('/frodo/postType/' + id, 'GET');
        }

        function getByIdWithPosts(id){
            return requestService.send('/frodo/postTypePosts/' + id, 'GET');
        }

        function getByType(type){
            return requestService.send('/frodo/postTypeByType/' + type, 'GET');
        }

        function getByTypeWithPosts(type){
            return requestService.send('/frodo/postTypeByTypePosts/' + type, 'GET');
        }

        function remove(id){
            return requestService.send('/frodo/postType/' + id, 'DELETE');
        }

        return {
            create: create,
            edit: edit,
            getAll: getAll,
            getById: getById,
            getByIdWithPosts: getByIdWithPosts,
            getByType: getByType,
            getByTypeWithPosts: getByTypeWithPosts,
            remove: remove
        }
    }]);
})();