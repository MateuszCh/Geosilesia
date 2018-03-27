(function(){
    angular.module('frodo').component('listing', {
        templateUrl: 'html/components/listing/listing.html',
        controllerAs: 'vm',
        bindings: {
            model: '<'
        },
        controller: ListingController
    });

    ListingController.$inject = ['$timeout', '$state', '$injector', '$rootScope'];
    function ListingController($timeout, $state, $injector, $rootScope){
        var vm = this;
        vm.$onInit = onInit;
        vm.add = add;
        vm.editPostType = editPostType;
        vm.remove = remove;
        vm.removeStatus = {
            busy: false,
            result: "",
            status: undefined,
        };

        var resultTimeout;
        var apiService;

        function onInit(){
            vm.listing = {
                type : $state.current.name,
                models: vm.model.data.posts || vm.model.data
            };
            if(vm.listing.type === 'posts'){
                vm.listing.title = vm.model.data.pluralTitle;
                vm.listing.postType = vm.model.data.type;
                vm.listing.postTypeId = vm.model.data.id;
            } else {
                vm.listing.title = $state.current.title;
            }
            apiService = $injector.get(vm.listing.type + 'Service');
            setEditLink();
            setDates();

        }

        function setDates(){
            vm.listing.models.forEach(function(model){
                model.date = new Date(parseInt(model._id.substring(0,8), 16) * 1000);
            });
        }

        function setEditLink(){
            var type = vm.listing.type === 'posts' ? ', type: model.type' : '';
            vm.editLink = vm.listing.type + 'Edit({id: model.id' + type + '})';
        }

        function add(){
            var params = {};
            if(vm.listing.type === 'posts') params.type = vm.listing.postType;
            $state.go(vm.listing.type + 'Add', params);
        }

        function editPostType(){
            $state.go('postTypesEdit', {id: vm.listing.postTypeId});
        }

        function remove(id, i){
            $timeout.cancel(resultTimeout);
            setRemoveStatus(id);
            apiService.remove(id)
                .then(function(response){
                    setRemoveStatus(id, response.data, response.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                    if(vm.listing.type === 'postTypes') $rootScope.$broadcast('postTypesUpdated');
                    vm.listing.models.splice(i, 1);
                })
                .catch(function(error){
                    console.log(error);
                    setRemoveStatus(false, error.data.error, error.status);
                    resultTimeout = $timeout(setRemoveStatus, 10000);
                })
        }

        function setRemoveStatus(id, result, status){
            vm.removeStatus = {
                busy: id || false,
                result: result || "",
                status: status || undefined
            };
        }

    }
})();