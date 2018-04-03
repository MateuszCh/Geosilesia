(function(){
    angular.module('frodo').service('pagesService', ['requestService', function(requestService){

        function create(data){
            return requestService.send('/frodo/page', 'POST', data);
        }

        function edit(data){
            return requestService.send('/frodo/page/edit', 'PUT', data);
        }

        function getAll(){
            return requestService.send('/frodo/page', 'GET');
        }

        function getById(id){
            return requestService.send('/frodo/page/' + id, 'GET');
        }

        function remove(id){
            return requestService.send('/frodo/page/' + id, 'DELETE');
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
