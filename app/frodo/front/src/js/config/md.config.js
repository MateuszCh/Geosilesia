(function(){
    angular.module('frodo').config(['$mdIconProvider', '$mdThemingProvider',
        function ($mdIconProvider, $mdThemingProvider) {

            $mdIconProvider.icon('menu', './images/menu.svg', 24)
                .icon('arrow', './images/arrow.svg', 24)
                .icon('sort', './images/sort.svg', 24);
            //
            // $mdThemingProvider.theme('default')
            //     .primaryPalette('orange')
            //     .warnPalette('pink')
            //     .accentPalette('green')

        }
    ]);
})();
