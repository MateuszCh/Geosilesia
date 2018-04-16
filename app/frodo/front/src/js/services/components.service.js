(function(){
    angular.module('frodo').service('componentsService', ['requestService', function(requestService){

        function create(data){
            return requestService.send('/frodo/component', 'POST', data);
        }

        function edit(data){
            return requestService.send('/frodo/component/edit', 'PUT', data);
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

        function exportPosts(){
            return requestService.send('/frodo/exportComponents', 'GET');
        }

        function importPosts(data){
            return requestService.send('/frodo/importComponents', 'POST', data);
        }

        return {
            create: create,
            edit: edit,
            getAll: getAll,
            getById: getById,
            remove: remove,
            exportPosts: exportPosts,
            importPosts: importPosts
        }
    }]);
})();