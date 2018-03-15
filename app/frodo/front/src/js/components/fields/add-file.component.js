(function () {
    angular.module('frodo').component('addFile', {
        templateUrl: 'html/components/fields/add-file.html',
        controllerAs: 'vm',
        bindings: {
            model: '=',
            section: '<'
        },
        controller: AddFileController
    });

    AddFileController.$inject = ['$scope', 'filesService', '$timeout', '$rootScope'];

    function AddFileController($scope, filesService, $timeout, $rootScope) {
        var vm = this;
        vm.$onInit = onInit;
        vm.chooseView = chooseView;
        vm.upload = upload;
        vm.onFilesSelect = onFilesSelect;
        vm.editIndex = editIndex;
        vm.removeFile = removeFile;
        vm.deleteFile = deleteFile;
        vm.saveFile = saveFile;
        vm.chooseFile = chooseFile;
        vm.existingFilesIndex = existingFilesIndex;
        vm.activeView = 'choose';
        vm.catalogues = [];
        vm.data = [];
        vm.loadingstatus = true;
        vm.currentExistingIndex = 0;
        var resultTimeout;

        vm.actionStatus = {
            busyType: false,
            result: "",
            status: undefined,
        };

        function onInit() {
            getAllFiles();
        }

        function editIndex(index) {
            vm.currentIndex = index;
            getCatalogues(vm.data);
        }

        function existingFilesIndex(index){
            vm.currentExistingIndex = index;
            getCatalogues(vm.allFiles);
        }

        function chooseView(view) {
            vm.activeView = view;
        }

        function removeFile() {
            vm.files.splice(vm.currentIndex, 1);
            vm.data.splice(vm.currentIndex, 1);
            vm.currentIndex = 0;
        }

        function chooseFile(){
            $rootScope.$broadcast('fileChoosen');
            vm.model = vm.allFiles[vm.currentExistingIndex];
        }

        function onFilesSelect() {
            vm.data = new Array(vm.files.length);
            vm.currentIndex = 0;
        }

        function getAllFiles() {
            vm.loadingstatus = true;
            filesService.getAllFiles()
                .then(function (r) {
                    vm.loadingstatus = false;
                    vm.allFiles = r.data;
                    getCatalogues(vm.allFiles);
                })
                .catch(function(e){
                    vm.loadingstatus = false;
                })
        }

        function upload() {

            var data = {};

            vm.data.forEach(function(fileData, i){
                data[i] = fileData;
            });
            if (vm.files.length) {
                $timeout.cancel(resultTimeout);
                setActionStatus('upload');
                filesService.upload(vm.files, data)
                    .then(function (response) {
                        if(response.data.length){
                            setActionStatus(false, 'Files uploaded successfully', response.status);
                            vm.allFiles = vm.allFiles.concat(response.data);
                            vm.data = [];
                            vm.files = [];
                            vm.activeView = 'choose';
                        } else {
                            setActionStatus(false, 'There was error uploading files', response.status);
                        }
                        resultTimeout = $timeout(setActionStatus, 5000);
                    })
                    .catch(function (e) {
                        setActionStatus(false, e.data.error, e.status);
                        resultTimeout = $timeout(setActionStatus, 5000);
                    })
            }
        }

        function deleteFile(){
            $timeout.cancel(resultTimeout);
            setActionStatus('delete');
            filesService.remove(vm.allFiles[vm.currentExistingIndex]._id)
                .then(function(r){
                    setActionStatus(false, 'File ' + vm.allFiles[vm.currentExistingIndex].filename + ' removed successfully', r.status);
                    resultTimeout = $timeout(setActionStatus, 5000);
                    vm.allFiles.splice(vm.currentExistingIndex, 1);
                    if(vm.currentExistingIndex !== 0){
                        vm.currentExistingIndex--;
                    }
                })
                .catch(function(e){
                    setActionStatus(false, e.data.error, e.status);
                    resultTimeout = $timeout(setActionStatus, 5000);
                })
        }

        function saveFile(){
            $timeout.cancel(resultTimeout);
            setActionStatus('save');
            filesService.edit(vm.allFiles[vm.currentExistingIndex])
                .then(function(r){
                    setActionStatus(false, 'File saved successfully', r.status);
                    resultTimeout = $timeout(setActionStatus, 5000);
                })
                .catch(function(e){
                    console.log(e);
                    setActionStatus(false, e.data.error, e.status);
                    resultTimeout = $timeout(setActionStatus, 5000);
                })
        }

        function getCatalogues(arr){
            var catalogues = [];
            arr.forEach(function(fileData){
                if(fileData.catalogue){
                    var catalogue = fileData.catalogue.toLowerCase();
                    if(vm.catalogues.indexOf(catalogue) === -1 && catalogues.indexOf(catalogue) === -1){
                        catalogues.push(catalogue);
                    }
                }
            });
            vm.catalogues = vm.catalogues.concat(catalogues).sort();
        }

        function setActionStatus(type, result, status){
            vm.actionStatus = {
                busyType: type || false,
                result: result || "",
                status: status || undefined
            }
        }

    }
})();