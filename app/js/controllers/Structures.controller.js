(function(){
    angular.module('geosilesia').controller('StructuresController', ['$scope', function($scope){
        $scope.activeTab = 1;
        $scope.checkTab = function(tab){
            $scope.activeTab = tab;
        }
    }]);
})();

