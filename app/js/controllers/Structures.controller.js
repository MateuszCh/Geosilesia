/**
 * Created by Mateusz Chybiorz on 2017-07-22.
 */
/**
 * Created by Mateusz Chybiorz on 2017-03-24.
 */

(function(){
    angular.module('geosilesia').controller('StructuresController', ['$scope', function($scope){
        $scope.activeTab = 1;
        $scope.checkTab = function(tab){
            $scope.activeTab = tab;
            console.log($scope.activeTab);
        }
    }]);
})();

