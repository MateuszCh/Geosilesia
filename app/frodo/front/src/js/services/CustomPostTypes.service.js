(function(){
    angular.module('frodo').service('customPostTypesService', ['requestService', function(requestService){

        function getAll(){
            return requestService.send('/frodo/customPostType', 'GET');
        }

        function getByType(type){
            return requestService.send('/frodo/customPostType/' + type, 'GET');
        }

        function removeById(id){
            return requestService.send('/frodo/customPostType/' + id, 'DELETE');
        }

        function create(data){
            return requestService.send('/frodo/customPostType', 'POST', data);
        }

        return {
            getAll: getAll,
            removeById: removeById,
            create: create,
            getByType: getByType
        }

    }]);
})();