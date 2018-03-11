(function(){
    angular.module('frodo').service('filesService', ['requestService', 'Upload', function(requestService, Upload){


        function getAllFiles(){
            return requestService.send('/frodo/file', 'GET');
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
            upload: upload
        }
    }]);
})();
