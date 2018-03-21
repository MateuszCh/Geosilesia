(function(){
    angular.module('frodo').run(['$rootScope', '$state',
        function ($rootScope, $state) {
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
                event.preventDefault();
                $state.get('error').error = error.detail.data.error;
                return $state.go('error');
            })
        }
    ]);
})();