(function () {
    angular.module('frodo').component('addFile', {
        templateUrl: 'html/components/fields/add-file.html',
        controllerAs: 'vm',
        bindings: {
            model: '='
        },
        controller: AddFileController
    });

    AddFileController.$inject = ['$scope', 'filesService'];

    function AddFileController($scope, filesService) {
        var vm = this;
        vm.$onInit = onInit;
        vm.chooseView = chooseView;
        vm.upload = upload;
        vm.onFilesSelect = onFilesSelect;
        vm.editIndex = editIndex;
        vm.removeFile = removeFile;
        vm.existingFilesIndex = existingFilesIndex;
        vm.activeView = 'choose';
        vm.catalogues = [];
        vm.currentExistingIndex = 0;

        function onInit() {
            getAllFiles();
        }

        vm.data = [];

        function removeFile() {
            vm.files.splice(vm.currentIndex, 1);
            vm.data.splice(vm.currentIndex, 1);
            vm.currentIndex = 0;
        }

        function onFilesSelect() {
            vm.data = new Array(vm.files.length);
            vm.currentIndex = 0;
        }

        function editIndex(index) {
            vm.currentIndex = index;
            getCatalogues(vm.data);
        }

        function existingFilesIndex(index){
            vm.currentExistingIndex = index;
        }

        function chooseView(panel) {
            vm.activeView = panel;
        }

        function upload() {

            var data = {};

            vm.data.forEach(function(fileData, i){
                data[i] = fileData;
            });
            if (vm.files.length) {
                filesService.upload(vm.files, data)
                    .then(function (response) {
                        if(response.data.length){
                            vm.allFiles = vm.allFiles.concat(response.data);
                            vm.data = [];
                            vm.files = [];
                            vm.activeView = 'choose';
                        }
                    })
                    .catch(function (e) {
                    })
            }
        }

        function getAllFiles() {
            filesService.getAllFiles()
                .then(function (r) {
                    vm.allFiles = r.data;
                    getCatalogues(vm.allFiles);
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

    }
})();