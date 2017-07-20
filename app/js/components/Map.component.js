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