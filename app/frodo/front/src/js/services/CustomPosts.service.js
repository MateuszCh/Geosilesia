(function(){
    angular.module('frodo').service('customPostsService', ['requestService', function(requestService){

        function create(data){
            return requestService.send('/frodo/customPost', 'POST', data);
        }

        return {
            create: create
        }

    }]);
})();