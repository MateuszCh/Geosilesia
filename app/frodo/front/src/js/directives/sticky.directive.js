(function(){
    angular.module('frodo').directive('sticky',[ function(){
        return function(scope, element, attrs){

            var el = element[0];

            var elRight;
            var elLeft;
            var windowWidth;
            var initOffset = el.offsetTop;

            window.addEventListener('scroll', function(){
                var windowOffset = window.pageYOffset;

                var elRect = el.getBoundingClientRect();

                if(!windowWidth){
                    windowWidth = window.innerWidth;
                }

                if(!elRight || !elLeft || windowWidth !== window.innerWidth){
                    elRight = windowWidth - elRect.right;
                    elLeft = elRect.left;
                }

                if(windowWidth !== window.innerWidth){
                    windowWidth = window.innerWidth;
                }

                if(windowOffset >= initOffset){
                    var style = 'position: fixed; top: 0; left:' + elLeft + 'px; right: ' + elRight + 'px; bottom: 0; overflow: auto;';
                    el.style = style;
                } else {
                    el.style = '';
                }
            })
        }
    }])
})();