(function(){
    angular.module('frodo').service('componentsService', ['requestService', function(requestService){

        function create(data){
            return requestService.send('/frodo/component', 'POST', data);
        }

        function edit(id, data){
            return requestService.send('/frodo/component/edit/' + id, 'PUT', data);
        }

        function getAll(){
            return requestService.send('/frodo/component', 'GET');
        }

        function getById(id){
            return requestService.send('/frodo/component/' + id, 'GET');
        }

        function remove(id){
            return requestService.send('/frodo/component/' + id, 'DELETE');
        }

        return {
            create: create,
            edit: edit,
            getAll: getAll,
            getById: getById,
            remove: remove
        }
    }]);
})();