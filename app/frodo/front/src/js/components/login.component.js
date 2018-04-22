(function(){
    angular.module('frodo').component('login', {
        templateUrl: 'html/components/login.html',
        controllerAs: 'vm',
        controller: LoginController,
        bindings: {
            exist: '<'
        }
    });

    LoginController.$inject = ['userService', '$location'];
    function LoginController(userService, $location){
        var vm = this;
        vm.$onInit = onInit;
        vm.login = login;
        vm.setForm = setform;
        vm.data = {};

        function onInit(){
            vm.exist = vm.exist.data;
        }

        function login(){
            vm.form.$submitted = true;
            vm.errorMessage = undefined;
            if(vm.form.$valid){
                vm.actionStatus = true;
                userService.login(vm.data)
                    .then(function(){
                        vm.actionStatus = false;
                        $location.path('/pages');
                    })
                    .catch(function(error){
                        vm.actionStatus = false;
                        vm.errorMessage = error.data;
                    })
            }
        }

        function setform(form){
            vm.form = form;
        }

    }
})();