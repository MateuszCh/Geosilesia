(function(){
    angular.module('frodo').component('page', {
        templateUrl: 'html/components/pages/page.html',
        controllerAs: 'vm',
        bindings: {
            edit: '<'
        },
        controller: PageController
    });

    PageController.$inject = ['$scope', '$compile', 'pagesService', '$rootScope', '$location', '$timeout', '$routeParams', 'tools'];
    function PageController($scope, $compile, pagesService, $rootScope, $location, $timeout, $routeParams, tools){
        var vm  = this;
        var resultTimeout;
        // var fieldsElement = angular.element(document.querySelector('#postFields'));
        vm.$onInit = onInit;
        vm.save = save;
        vm.remove = remove;
        // vm.addField = addField;
        // vm.formatTypeString = formatTypeString;

        vm.actionStatus = {
            busy: false,
            result: "",
            status: undefined,
        };

        vm.model = {
            title: '',
            url: '',
            rows: []
        };

        function onInit(){
            if(vm.edit){
                pagesService.getById($routeParams.id)
                    .then(function(response){
                        if(!response.data){
                            $location.path('/pages');
                        } else {
                            vm.model = response.data;
                            vm.currentTitle = vm.model.title;
                        }
                    })
                    .catch(function(){
                        $location.path('/pages');
                    })
            }
        }

        // function addField(){
        //     var html = '<add-field model="vm.model.fields"></add-field>';
        //     var newField = $compile(html)($scope);
        //     fieldsElement.append(newField);
        // }
        //
        // function formatTypeString(){
        //     if(vm.model.type){
        //         vm.model.type = vm.model.type.replace(/\s+/g, "_").toLowerCase();
        //     }
        // }

        function save(){
            $timeout.cancel(resultTimeout);
            setActionStatus('save');
            var promise = vm.edit ? pagesService.edit(vm.model) : pagesService.create(vm.model);

            promise
                .then(function(response){
                    if(vm.edit){
                        vm.model = response.data;
                        vm.currentTitle = vm.model.title;
                        setActionStatus(false, vm.model.title +  " page updated successfully", response.status);
                        resultTimeout = $timeout(setActionStatus, 10000);
                    } else {
                        $location.path('/pages');
                    }
                })
                .catch(function(err){
                    setActionStatus(false, err.data.error, err.status);
                    resultTimeout = $timeout(setActionStatus, 10000);
                })
        }

        function remove(){
            $timeout.cancel(resultTimeout);
            setActionStatus('remove');
            pagesService.remove(vm.model._id)
                .then(function(){
                    setActionStatus();
                    $location.path('/pages');
                })
                .catch(function(err){
                    setActionStatus(false, 'There was error removing ' + vm.model.title + ' page.', err.status);
                    resultTimeout = $timeout(setActionStatus, 10000);
                })
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