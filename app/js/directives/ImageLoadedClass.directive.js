(function(){
    angular.module('geosilesia').directive('imageLoaded', function() {
        return {
            restrict: 'A',
            link: link
        };
        function link(scope, element){
            var img = element.find('img');
            img.bind('load', function () {
                element.addClass('figury-up');
            })
        }
    });
})();