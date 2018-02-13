(function(){
    angular.module('frodo').service('customPostsService', ['requestService', function(requestService){

        function create(data){
            return requestService.send('/frodo/customPost', 'POST', data);
        }

        function removeById(id){
            return requestService.send('/frodo/customPost/' + id, 'DELETE');
        }

        function getById(id){
            return requestService.send('/frodo/customPost/' + id, 'GET');
        }

        function edit(id, data){
            return requestService.send('/frodo/customPost/edit/' + id, 'PUT', data);
        }

        return {
            create: create,
            removeById: removeById,
            getById: getById,
            edit: edit
        }

    }]);
})();
