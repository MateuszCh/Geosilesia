(function(){
    angular.module('frodo').service('userService', ['requestService', function(requestService){

        function login(data){
            return requestService.send('/user/login', 'POST', data);
        }

        function logout(){
            return requestService.send('/user/logout', 'GET');
        }

        function exist(){
            return requestService.send('/user/exist', 'GET');
        }

        return {
            login: login,
            logout: logout,
            exist: exist
        }
    }])
})();