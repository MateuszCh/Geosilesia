(function(){
    angular.module('frodo').service('postTypesService', ['requestService', function(requestService){

        function getAll(){
            return requestService.send('/frodo/postType', 'GET');
        }

        function getById(id){
            return requestService.send('/frodo/postType/' + id, 'GET');
        }

        function getByType(type){
            return requestService.send('/frodo/postTypeByType/' + type, 'GET');
        }

        function getByTypeWithPosts(type){
            return requestService.send('/frodo/postTypeByTypePosts/' + type, 'GET');
        }

        function getByIdWithPosts(id){
            return requestService.send('/frodo/postTypePosts/' + id, 'GET');
        }

        function removeById(id){
            return requestService.send('/frodo/postType/' + id, 'DELETE');
        }

        function create(data){
            return requestService.send('/frodo/postType', 'POST', data);
        }

        function edit(id, data){
            return requestService.send('/frodo/postType/edit/' + id, 'PUT', data);
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