(function(){
    angular.module('frodo').component('page', {
        templateUrl: 'html/components/pages/page.html',
        controllerAs: 'vm',
        bindings: {
            edit: '<',
            components: '<',
            page: '<page'
        },
        controller: PageController
    });

    PageController.$inject = ['$scope', '$compile', 'pagesService', '$rootScope', '$location', '$timeout'];
    function PageController($scope, $compile, pagesService, $rootScope, $location, $timeout){
        var vm  = this;
        var resultTimeout;
        var componentsElement = angular.element(document.querySelector('#components'));
        vm.$onInit = onInit;
        vm.save = save;
        vm.remove = remove;
        vm.addComponent = addComponent;

        vm.actionStatus = {
            busy: false,
            result: "",
            status: undefined,
        };

        vm.model = {
            title: '',
            pageUrl: '',
            rows: []
        };

        function onInit(){
            var componentsObject = {};
            vm.components.data.forEach(function(component){
                componentsObject[component.type] = component;
            });
            vm.components = componentsObject;
            if(vm.edit){
                vm.model = vm.page.data;
                vm.currentTitle = vm.model.title;
                vm.rowsNumber = new Array(vm.model.rows.length);
            }
        }

        function addComponent(){
            var html = '<add-component rows="vm.model.rows" components="::vm.components"></add-component>';
            var newComponent = $compile(html)($scope);
            componentsElement.append(newComponent);
        }

        function save(){
            $timeout.cancel(resultTimeout);
            setActionStatus('save');
            var promise = vm.edit ? pagesService.edit(vm.model) : pagesService.create(vm.model);

            promise
                .then(function(response){
                    if(vm.edit){
                        vm.model = response.data;
                        $timeout(function(){
                            $rootScope.$broadcast("pageSaved");
                        }, 10);
                        vm.currentTitle = vm.model.title;
                        setActionStatus(false, vm.model.title +  " page updated successfully", response.status);
                        resultTimeout = $timeout(setActionStatus, 10000);
                    } else {
                        $location.path(response.data.url);
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