(function(){
    angular.module('geosilesia').directive('setFullHeight', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: link,
        };
        function link(scope, element){
            setHeight();

            window.addEventListener('resize', delayedSetHeight);
            window.addEventListener('scroll', setHeight);

            element.on('$destroy', function(){
                window.removeEventListener('resize', delayedSetHeight);
                window.removeEventListener('scroll', setHeight);
            });

            function setHeight(){
                element[0].style.height = window.innerHeight + 'px';
            }

            function delayedSetHeight(){
                $timeout(setHeight, 1);
            }
        }
    }]);
})();