(function () {
    angular.module('frodo').component('files', {
        templateUrl: 'html/components/files.html',
        controllerAs: 'vm',
        bindings: {
            allFiles: '<',
            isPopup: '<'
        },
        controller: FilesController
    });

    FilesController.$inject = ['$scope', 'filesService', '$timeout', '$rootScope', '$mdDialog', 'tools', '$mdMedia'];

    function FilesController($scope, filesService, $timeout, $rootScope, $mdDialog, tools, $mdMedia) {
        var vm = this;
        vm.$onInit = onInit;
        vm.$mdMedia = $mdMedia;
        vm.chooseView = chooseView;
        vm.upload = upload;
        vm.onFilesSelect = onFilesSelect;
        vm.editIndex = editIndex;
        vm.removeFile = removeFile;
        vm.deleteFile = deleteFile;
        vm.deleteDialog = deleteDialog;
        vm.saveFile = saveFile;
        vm.chooseFile = chooseFile;
        vm.existingFilesIndex = existingFilesIndex;
        vm.activeView = 'choose';
        vm.catalogues = [];
        vm.data = [];
        vm.currentExistingIndex = 0;
        vm.actionStatus = '';

        vm.search = {text: '', catalogues: []};

        function onInit(){
            if(!vm.allFiles){
                vm.section = true;
                vm.loadingFiles = true;
                filesService.getAllFiles()
                    .then(function(response){
                        vm.loadingFiles = false;
                        vm.allFiles = response.data;
                        getCatalogues(vm.allFiles);
                        setDates();
                        setLocalId();
                    })
                    .catch(function(error){
                        vm.loadingFiles = false;
                    })
            } else {
                vm.allFiles = vm.allFiles.data;
                getCatalogues(vm.allFiles);
                setDates();
                setLocalId();
            }



            $scope.$on('filesFiltered', function(ev, i, l){
                if(vm.currentFilterLength !== l){
                    vm.currentExistingIndex = i;
                    vm.currentFilterLength = l;
                }
            })

        }

        function setDates(){
            vm.allFiles.forEach(function(file){
                file.date = new Date(file.date);

                if(isNaN(file.date.getTime())){
                    file.date = null;
                }

            })
        }

        function editIndex(index) {
            vm.currentIndex = index;
            getCatalogues(vm.data);
        }

        function existingFilesIndex(index){
            vm.currentExistingIndex = index;
            getCatalogues(vm.allFiles);
            if($mdMedia('xs')){
                vm.editPopUp = true;
            }
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
            $mdDialog.hide(vm.allFiles[vm.currentExistingIndex]);
        }

        function onFilesSelect() {
            vm.data = new Array(vm.files.length);
            var i = 0;
            for(i; i < vm.data.length; i++){
                vm.data[i] = {date: null};
            }
            vm.currentIndex = 0;
        }

        function upload(ev) {

            var data = {};

            vm.data.forEach(function(fileData, i){
                data[i] = fileData;
            });
            if (vm.files.length) {
                vm.actionStatus = 'upload';
                filesService.upload(vm.files, data)
                    .then(function (response) {
                        vm.actionStatus = '';
                        if(response.data.length){
                            vm.allFiles = vm.allFiles.concat(response.data);
                            setLocalId();
                            vm.data = [];
                            vm.files = [];
                            tools.infoDialog('Files uploaded successfully', ev);
                            vm.activeView = 'choose';
                        }
                    }, function(resp){}, function(evt){
                        vm.progress = parseInt(100.0 * evt.loaded / evt.total);
                    })
                    .catch(function (e) {
                        vm.actionStatus = '';
                        tools.infoDialog(e.data.error || e.data, ev);
                    })
            }
        }

        function deleteFile(ev){
            vm.actionStatus = 'delete';
            filesService.remove(vm.allFiles[vm.currentExistingIndex]._id)
                .then(function(r){
                    vm.actionStatus = '';
                    if($mdMedia('xs')){
                        vm.editPopUp = false;
                    }
                    tools.infoDialog(vm.allFiles[vm.currentExistingIndex].filename + ' removed successfully', ev);
                    vm.allFiles.splice(vm.currentExistingIndex, 1);
                    setLocalId();
                    // if(vm.currentExistingIndex !== 0){
                    //     vm.currentExistingIndex--;
                    // }
                    console.log(vm.currentExistingIndex);
                })
                .catch(function(e){
                    vm.actionStatus = '';
                    tools.infoDialog(e.data.error || e.data, ev);
                })
        }

        function deleteDialog(ev){
            tools.removeDialog(ev, deleteFile, 'Are you sure you want to delete ' + vm.allFiles[vm.currentExistingIndex].filename);
        }

        function setLocalId(){
            var i = 0;
            for(i; i < vm.allFiles.length; i++){
                vm.allFiles[i].localId = i;
            }
        }

        function saveFile(ev){
            vm.actionStatus = 'save';
            filesService.edit(vm.allFiles[vm.currentExistingIndex])
                .then(function(r){
                    vm.actionStatus = '';
                    getCatalogues(vm.allFiles);
                    tools.infoDialog(vm.allFiles[vm.currentExistingIndex].filename + ' saved successfully', ev);
                })
                .catch(function(e){
                    vm.actionStatus = '';
                    tools.infoDialog(e.data.error || e.data, ev);
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
            filesService.setCatalogues(vm.catalogues);

        }

    }
})();