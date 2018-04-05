(function(){
    angular.module('frodo').config(['$mdIconProvider', '$mdThemingProvider', '$mdDateLocaleProvider',
        function ($mdIconProvider, $mdThemingProvider, $mdDateLocaleProvider) {

            $mdDateLocaleProvider.formatDate = function(date) {
                if(!date){
                    return date;
                }
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            };

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