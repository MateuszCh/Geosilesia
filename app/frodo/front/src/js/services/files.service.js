(function(){
    angular.module('frodo').service('filesService', ['requestService', 'Upload', function(requestService, Upload){

        var _catalogues;

        function getAllFiles(){
            return requestService.send('/frodo/file', 'GET');
        }

        function getCatalogues(){
            if(_catalogues){
                return _catalogues;
            } else {
                return requestService.send('/frodo/file/catalogues', 'GET');
            }
        }

        function setCatalogues(catalogues){
            _catalogues = catalogues;
        }

        function getByCatalogue(catalogue){
            return requestService.send('/frodo/file/' + catalogue, 'GET');
        }

        function remove(id){
            return requestService.send('/frodo/file/' + id, 'DELETE');
        }

        function edit(data){
            return requestService.send('/frodo/file', 'PUT', data);
        }

        function upload(files, filesData){
            return Upload.upload({
                url: '/frodo/file',
                data: {
                    files: files,
                    filesData: filesData
                },
                arrayKey: ''
            })
        }

        return {
            getAllFiles: getAllFiles,
            getCatalogues: getCatalogues,
            setCatalogues: setCatalogues,
            getByCatalogue: getByCatalogue,
            upload: upload,
            edit: edit,
            remove: remove
        }
    }]);
})();
