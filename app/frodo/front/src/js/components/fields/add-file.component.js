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
        vm.activeView = 'choose';

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
            getAllCatalogues();
        }

        function chooseView(panel) {
            vm.activeView = panel;
        }

        function getAllCatalogues(){
            var catalogues = [];
            vm.data.forEach(function(fileData){
                if(fileData.catalogue){
                    catalogues.push(fileData.catalogue);
                }
            });
            vm.catalogues = catalogues;
        }

        function upload() {

            var data = {};

            vm.data.forEach(function(fileData, i){
                data[i] = fileData;
            });
            if (vm.files.length) {
                filesService.upload(vm.files, data)
                    .then(function (response) {
                        console.log(response.data);
                        if(response.data.length){
                            vm.allFiles = vm.allFiles.concat(response.data);
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
                })
        }

    }
})();