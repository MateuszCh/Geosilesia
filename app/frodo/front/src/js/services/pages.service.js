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

        function exportPosts(){
            return requestService.send('/frodo/exportPages', 'GET');
        }

        function importPosts(data){
            return requestService.send('/frodo/importPages', 'POST', data);
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
