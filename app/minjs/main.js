/**
 * Created by Mateusz Chybiorz on 2017-03-24.
 */

(function(){
    var geosilesia = angular.module('geosilesia', ['ngRoute']);

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
    HeaderController.$inject = ['$scope'];
    function HeaderController(){
        var vm = this;
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

    HomepageController.$inject = ['$http'];

    function HomepageController($http){
        var vm = this;
        vm.markers = [];
        vm.$onInit = onInit;
        function onInit(){
            $http.get("json/markers.json").then(function (response) {
                vm.markers = response.data.obiekty;
                console.log(vm.markers);
            })
        }
    }
})();

/**
 * Created by Mateusz Chybiorz on 2017-07-09.
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
            console.log(changes);
            if(vm.markers){
                obiekty = vm.markers;
                console.log("oninit");
                console.log(obiekty);
                console.log(vm.markers);
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
                console.log(vm.news);
            });
        }

        vm.action = function (event) {
            var target = angular.element(event.currentTarget);
            var parent = angular.element(event.currentTarget.parentNode);
            parent.hasClass("border") ? thesame = false : thesame = true;

            angular.element(document.querySelectorAll("article")).removeClass('border');
            angular.element(document.querySelectorAll(".body")).removeClass("dol");

            if (thesame) {
                parent.addClass('border');
                target.next().addClass('dol');
            }
        }


    }

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
            when('/about', {
                template: '<about></about>'
            }).
            when('/english', {
                template: '<english></english>'
            }).
            when('/dictionary', {
                template: '<dictionary></dictionary>'
            }).
            when('/news', {
                template: '<events></events>'
            }).
            when('/gallery', {
                templateUrl: 'html/views/gallery.html'
            }).
            otherwise('/');
            $locationProvider.html5Mode(true);

        }
    ]);
})();
