(function(){
    angular.module('frodo').component('field', {
        templateUrl: 'html/components/field.html',
        controllerAs: 'vm',
        bindings: {
            model: '=',
            field: '<',
        },
        controller: FieldController
    });

    FieldController.$inject = ['$scope', '$mdDialog', 'filesService'];
    function FieldController($scope, $mdDialog, filesService){
        var vm  = this;
        vm.showFilePopup = false;

        vm.$onInit = onInit;
        vm.showFiles = showFiles;

        function onInit(){
            vm.catalogues = filesService.getCatalogues();
        }

        function showFiles(ev){
            $mdDialog.show({
                controller: FilesDialogController,
                templateUrl: 'html/files-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: true,
                clickOutsideToClose: true
            }).then(function(answer){
                console.log(answer);
                if(answer) vm.model[vm.field.id] = answer;

            }, function(){})
        }



    }

    angular.module('frodo').controller('filesDialogController', ['$scope', '$mdDialog', function($scope, $mdDialog){
        $scope.hide = function(){
            $mdDialog.hide();
        }
    }]);

    FilesDialogController.$inject = ['$scope', '$mdDialog'];

    function FilesDialogController($scope, $mdDialog){
        $scope.hide = function(){
            $mdDialog.hide();
        }
    }
})();

// $scope.showAdvanced = function(ev) {
//     $mdDialog.show({
//         controller: DialogController,
//         templateUrl: 'dialog1.tmpl.html',
//         parent: angular.element(document.body),
//         targetEvent: ev,
//         clickOutsideToClose:true,
//         fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
//     })
//         .then(function(answer) {
//             $scope.status = 'You said the information was "' + answer + '".';
//         }, function() {
//             $scope.status = 'You cancelled the dialog.';
//         });
// };