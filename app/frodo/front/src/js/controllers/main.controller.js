(function(){
    angular.module('frodo').controller('MainController',['$window', '$scope', 'tools', 'filesService', '$rootScope', function($window, $scope, tools, filesService, $rootScope){

        var debouncedOnResize = tools.debounce(onResize, 100);

        $window.addEventListener('resize', debouncedOnResize);
        function onResize(){
            size();
            $scope.$apply();
        }

        $scope.$on('filesUpdated', getCatalogues);

        function getCatalogues(){
            filesService.getCatalogues()
                .then(function(response){
                    $rootScope.catalogues = response.data;
                })
                .catch(function(error){

                });
        }

        function size(){
            var width = $window.innerWidth;
            if(width < 600){
                $scope.size = 'size-s';
            } else if (width < 960){
                $scope.size = 'size-m';
            } else if (width < 1280){
                $scope.size = 'size-l';
            } else if (width < 1921) {
                $scope.size = 'size-x';
            } else {
                $scope.size = 'size-xl';
            }
        }

        size();
        getCatalogues();
    }])
})();