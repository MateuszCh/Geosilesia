/**
 * Created by Mateusz Chybiorz on 2017-03-24.
 */

(function(){
    var geosilesia = angular.module('geosilesia', ['ngRoute', 'ngAnimate', 'duScroll', 'ngTouch']);

    angular.module('geosilesia').controller('MainController', ['$scope', '$window', '$rootScope', function($scope, $window, $rootScope){



        $scope.init = function(){
            setSize();
        };
        $scope.init();
        $window.addEventListener('scroll', showButtonUp);
        $window.addEventListener('resize', function () {
            setSize(true);
        });


        function showButtonUp(){
            if (this.pageYOffset >= 100) {
                $scope.showButtonUp = true;
            } else {
                $scope.showButtonUp = false;
            }
            $scope.$apply();
        }

        $rootScope.$on("$routeChangeSuccess", function(){
            $window.scrollTo(0,0);
            $rootScope.blur = false;
        });

        function resetSizes(){
            $rootScope.isS = false;
            $rootScope.isM = false;
            $rootScope.isL = false;
            $rootScope.isX = false;
        }


        function setSize(apply){
            resetSizes();
            var width = $window.innerWidth;
            if(width < 767){
                $rootScope.isS = true;
            } else if (width < 1200){
                $rootScope.isM = true;
            } else if (width < 1500){
                $rootScope.isL = true;
            } else {
                $rootScope.isX = true;
            }
            if(apply){
                $scope.$apply();
            }
        }
    }]);
})();


/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */
(function(){
    angular.module('geosilesia').component('about', {
        templateUrl: 'html/views/about.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: AboutController
    });

    AboutController.$inject = [];

    function AboutController(){
        var vm = this;
    }
})();

/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */
(function(){
    angular.module('geosilesia').component('dictionary', {
        templateUrl: 'html/views/dictionary.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: DictionaryController
    });

    DictionaryController.$inject = [];

    function DictionaryController(){
        var vm = this;
    }
})();

/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */
(function(){
    angular.module('geosilesia').component('english', {
        templateUrl: 'html/views/english.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: EnglishController
    });

    EnglishController.$inject = [];

    function EnglishController(){
        var vm = this;
    }
})();

/**
 * Created by Mateusz Chybiorz on 2017-07-26.
 */
(function(){
    angular.module('geosilesia').component('galleries', {
        templateUrl: 'html/views/galleries.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: GalleriesController
    });

    GalleriesController.$inject = ['$http', '$timeout'];

    function GalleriesController($http, $timeout){
        var vm = this;
        vm.galleries = [];
        vm.$onInit = onInit;
        vm.selectedCategory = 'all';
        vm.changeCategory = changeCategory;
        var timer;

        vm.categories = [
            {category: 'wyzyna', categoryText : 'krainy geograficzne'},
            {category: 'mineralySkaly', categoryText : 'minerały i skały'},
            {category : 'dziedzictwo', categoryText : 'dziedzictwo poprzemysłowe'},
            {category : 'sciezki', categoryText : 'ścieżki tematyczne'},
            {category : 'wydarzenia', categoryText : 'wydarzenia'},
            {category : 'all', categoryText: 'wszystkie'}
        ];

        function onInit() {
            $http.get("json/gallery.json").then(function (response) {
                vm.galleries = response.data.gallery;
            });
        }

        function changeCategory(category){

            if(vm.selectedCategory !== category){
                $timeout.cancel(timer);
                vm.selectedCategory = undefined;
                timer = $timeout(function () {
                    vm.selectedCategory = category;
                }, 300);

            }
        }
    }
})();
/**
 * Created by Mateusz Chybiorz on 2017-07-23.
 */
(function(){
    angular.module('geosilesia').component('gallery', {
        templateUrl: 'html/views/gallery.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: GalleryController
    });

    GalleryController.$inject = ['$http', '$routeParams', '$rootScope'];

    function GalleryController($http, $routeParams, $rootScope){
        var vm = this;
        vm.$onInit = onInit;
        vm.showFullMode = false;
        vm.openFullMode = openFullMode;

        function openFullMode(img) {
            vm.showFullMode = true;
            vm.openWith = img;
            $rootScope.blur = true;
        }

        function onInit() {
            $http.get("json/galleries/" + $routeParams.galleryId + ".json").then(function (gallery) {
                vm.gallery = gallery.data;
            });
        }
    }
})();
/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */
(function(){
    angular.module('geosilesia').component('header', {
        templateUrl: 'html/header.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: HeaderController
    });
    HeaderController.$inject = ['$window', '$rootScope', '$location'];
    function HeaderController($window, $rootScope, $location){

        var vm = this;
        vm.$onInit = onInit;
        vm.hamOpen = false;
        vm.openHam = openHam;
        vm.activeGeo = false;
        vm.checkGeo = checkGeo;

        vm.nav = [
            {title: 'O serwisie', link: '/o-nas'},
            {title: 'Geośląsk', submenu : [
                {subtitle: 'Położenie', link : '/polozenie'},
                {subtitle: 'Rzeźba terenu', link: '/rzezba'},
                {subtitle: 'Budowa geologiczna', link: '/budowa'},
                {subtitle: 'Geostanowiska', link: '/geostanowiska'},
                {subtitle: 'Atakcje geoturystyczne', link: '/atrakcje'}
            ]},
            {title: 'Wydarzenia', link: '/wydarzenia'},
            {title: 'Słownik', link: '/slownik'},
            {title: 'Galeria', link: '/galeria'},
            {title: 'English', link: '/english'}
        ];

        function onInit(){
            $window.addEventListener('resize', resetHeader);
            $rootScope.$on("$routeChangeSuccess", function(){
                vm.currentPath = $location.path();
                if(vm.currentPath === '/'){
                    vm.activeGeo = false;
                    vm.hamOpen = false;
                }
            });
        }

        function openHam() {
            return vm.hamOpen ? vm.hamOpen = false : vm.hamOpen = true;
        }

        function checkGeo(link) {
            vm.activeGeo = link.subtitle;
        }

        function resetHeader(){
            vm.hamOpen = false;
        }
    }
})();

/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */
(function(){
    angular.module('geosilesia').component('homepage', {
        templateUrl: 'html/views/homepage.html',
        bindings: {
            custom: '<'
        },
        controllerAs: 'vm',
        controller: HomepageController
    });

    HomepageController.$inject = ['$http', '$window', '$rootScope'];

    function HomepageController($http, $window, $rootScope){
        var vm = this;
        vm.markers = [];
        vm.$onInit = onInit;
        vm.$onDestroy = onDestroy;
        var mainHeader = document.getElementById("mainHeader");

        vm.scrollTo

        function onDestroy(){
            $rootScope.hideHeader = false;
            $window.removeEventListener('scroll', hideHeader);
        }

        function onInit(){
            $http.get("json/markers.json").then(function (response) {
                vm.markers = response.data.obiekty;
            });

            if(document.getElementById('map')){
                $window.addEventListener('scroll', hideHeader);
            }
        }

        function hideHeader(){
            if(mainHeader){
                var sizeOfHeader = mainHeader.offsetHeight;
                var heightInner = $window.innerHeight;
                var scrollTopWindow = $window.scrollY;
                var diff = scrollTopWindow + sizeOfHeader;
                if(heightInner < diff){
                    $rootScope.hideHeader = true;
                } else {
                    $rootScope.hideHeader = false;
                }
            }
        }
    }
})();



(function(){
    angular.module('geosilesia').component('fullscreenImage', {
        templateUrl: 'html/views/fullscreen-image.html',
        bindings: {
            custom: '<',
            images: '<',
            activeSlide: '<',
            show : '='
        },
        controllerAs: 'vm',
        controller: fullscreenImage
    });

    fullscreenImage.$inject = ['$rootScope', '$timeout'];

    function fullscreenImage($rootScope, $timeout) {
        var vm = this;
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.closeFullScreenMode = closeFullScreenMode;

        function closeFullScreenMode(){
            $rootScope.blur = false;
            vm.show = false;
        }

        vm.next = function(){
            vm.back = false;
            $timeout(function(){
                vm.noMove = false;
                if((vm.currentImage + 1) === vm.numberOfImages){
                    vm.currentImage = 0;
                    vm.nextImage = 1;
                    vm.prevImage = vm.numberOfImages - 1;
                } else {
                    vm.currentImage++;
                    if((vm.currentImage + 1) === vm.numberOfImages){
                        vm.nextImage = 0;
                        vm.prevImage = vm.numberOfImages - 2;
                    } else {
                        vm.nextImage = vm.currentImage + 1;
                        vm.prevImage = vm.currentImage - 1;
                    }
                }
            }, 100);

        };

        vm.prev = function(){
            vm.back = true;
            vm.noMove = true;
            $timeout(function(){
                vm.noMove = false;
                if(vm.currentImage === 0){
                    vm.currentImage = (vm.numberOfImages - 1);
                    vm.nextImage = 0;
                    vm.prevImage = vm.currentImage - 1;
                } else {
                    vm.currentImage--;
                    if(vm.currentImage === 0){
                        vm.nextImage = 1;
                        vm.prevImage = (vm.numberOfImages - 1);
                    } else {
                        vm.nextImage = vm.currentImage + 1;
                        vm.prevImage = vm.currentImage - 1;
                    }

                }
            }, 10);

        };

        function onInit() {
            // vm.noMove = true;
        }

        function onChanges(changes){
            if(changes.images && changes.images.currentValue){
                vm.numberOfImages = changes.images.currentValue.length;
            }
            if(changes.activeSlide){
                vm.noMove = true;
                vm.currentImage = changes.activeSlide.currentValue;
                vm.nextImage = vm.currentImage + 1;
                vm.prevImage = vm.currentImage - 1;
            } else {
                vm.currentImage = 0;
            }
        }
    }
})();
/**
 * Created by Mateusz Chybiorz on 2017-07-17.
 */
(function(){
    angular.module('geosilesia').component('map', {
        template: '<div id="map" class="map"></div>',
        bindings: {
            markers: '<'
        },
        controllerAs: 'vm',
        controller: MapController
    });

    MapController.$inject = ['mapStyle', 'iconsForMarkers'];
    function MapController(mapStyle, iconsForMarkers){

        var vm = this;
        vm.$onChanges = onChanges;

        function onChanges(changes){
            if(vm.markers){
                obiekty = vm.markers;
                var map, marker, i, infowindow;

                var styledMapType = mapStyle;

                var icons  = iconsForMarkers;

                var mapOptions =    {
                    center: {
                        lat: 50.277978,
                        lng: 19.020544
                    },
                    zoom: 10,
                    scrollwheel: false,
                    draggable: true,
                    mapTypeId: "terrain",
                    minZoom: 8,
                    fullscreenControl: true,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_TOP
                    },
                    streetViewControl: true,
                    streetViewControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_TOP
                    },
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    },
                    scaleControl: true
                };

                map = new google.maps.Map(document.getElementById("map"), mapOptions);
                map.mapTypes.set("styled_map", styledMapType);
                infowindow = new google.maps.InfoWindow();

                for (i = 0; i < obiekty.length; i++) {


                    var pozycja = eval("(" + obiekty[i].position + ")");

                    marker = new google.maps.Marker({
                        position: pozycja,
                        map: map,
                        title: obiekty[i].title,
                        icon: icons[obiekty[i].category].icon
                    });
                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            infowindow.setContent("<div class='markerDeskription'><p>" + obiekty[i].title + "</p><p>" + obiekty[i].place + "</p><a href=" + obiekty[i].hyperlink + " target='_blank'>Więcej</a></div>");
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
                }
            }

        }
    }
})();
(function(){
    angular.module('geosilesia').component('events', {
            templateUrl: 'html/views/news.html',
            bindings: {
                custom: '<'
            },
            controllerAs: 'vm',
            controller: NewsController
        });

    NewsController.$inject = ['$http'];

    function NewsController($http) {
        var vm = this;
        vm.news = [];
        vm.$onInit = onInit;

        function onInit() {
            $http.get("json/events.json").then(function (response) {
                vm.news = response.data.news;
            });
        }
    }
})();
/**
 * Created by Mateusz Chybiorz on 2017-07-16.
 */

(function(){
    angular.module('geosilesia').config(['$locationProvider', '$routeProvider',
        function ($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider.
            when('/',{
                template: '<homepage></homepage>'
            }).
            when('/o-nas', {
                template: '<about></about>'
            }).
            when('/english', {
                template: '<english></english>'
            }).
            when('/slownik', {
                template: '<dictionary></dictionary>'
            }).
            when('/wydarzenia', {
                template: '<events></events>'
            }).
            when('/galeria', {
                template: '<galleries></galleries>'
            }).
            when('/galeria/:galleryId', {
                template: '<gallery></gallery>'
            }).
            when('/polozenie', {
                templateUrl: 'html/views/geoslask/polozenie.html'
            }).
            when('/rzezba', {
                templateUrl: 'html/views/geoslask/rzezba.html'
            }).
            when('/budowa', {
                templateUrl: 'html/views/geoslask/budowa.html'
            }).
            when('/geostanowiska', {
                templateUrl: 'html/views/geoslask/geostanowiska.html'
            }).
            when('/atrakcje', {
                templateUrl: 'html/views/geoslask/atrakcje.html'
            }).
            otherwise('/');
            $locationProvider.html5Mode(true);

        }
    ]);
})();

/**
 * Created by Mateusz Chybiorz on 2017-07-09.
 */
(function(){
    angular.module('geosilesia').value('iconsForMarkers', {
        wybraneGeostanowiska:    {
            name: "Wybrane geostanowiska",
            icon: "images/markers/fossils.png"
        },
        trasyPodziemne:  {
            name: "Trasy podziemne",
            icon: "images/markers/cave-2.png"
        },
        muzeaGeologiczneIDinoparki:    {
            name: "Muzea geologiczne, ośrodki edukacyjne i dinoparki",
            icon: "images/markers/museum_science.png"
        },
        obiektyPrzemysloweIPoprzemyslowe:   {
            name: "Obiekty przemysłowe i poprzemysłowe",
            icon: "images/markers/museum_industry.png"
        },
        uzdrowiskaIObiektyUzdrowiskowe: {
            name: "Uzdrowiska i obiekty uzdrowiskowe",
            icon: "images/markers/spa.png"
        },
        obszaryIObiektyChronione:   {
            name: "Obszary i obiekty chronione",
            icon: "images/markers/peak.png"
        },
        sciezkiTematyczne: {
            name: "Ścieżki tematyczne",
            icon: "images/markers/walkingtour.png"
        },
        inne:   {
            name: "inne",
            icon: "images/markers/world.png"
        },
        geostanowiskaMiedzynarodowe:    {
            name: "Geostanowiska międzynarodowe",
            icon: "images/markers/world_geostanowiska.png"
        }
    });
})();

/**
 * Created by Mateusz Chybiorz on 2017-07-09.
 */
(function(){
    angular.module('geosilesia').constant('mapStyle', new google.maps.StyledMapType(
        [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ],{name: 'Custom'})
    );
})();

/**
 * Created by Mateusz Chybiorz on 2017-07-23.
 */
(function(){
    angular.module('geosilesia').directive('imageLoaded', function() {
        return {
            restrict: 'A',
            link: link
        };
        function link(scope, element){
            var img = element.find('img');
            img.bind('load', function () {
                element.addClass('figuryUp');
            })
        }
    });
})();
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

