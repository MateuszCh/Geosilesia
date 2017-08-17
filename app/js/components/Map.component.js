(function(){
    angular.module('geosilesia').component('map', {
        bindings: {
            markers: '<',
            options: '<',
            animation: '<',
            randomAnimation: '<'
        },
        controllerAs: 'vm',
        controller: MapController
    });

    MapController.$inject = ['mapStyle', 'iconsForMarkers', '$element', '$timeout'];
    function MapController(mapStyle, iconsForMarkers, $element, $timeout){

        var vm = this;
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        var map, marker, search;
        var infowindow = new google.maps.InfoWindow();
        var markers = [];

        var mapOptions = {
            center: {
                lat: 50.277978,
                lng: 19.020544
            },
            zoom: 10,
            scrollwheel: false,
            draggable: true,
            mapTypeId: "terrain",
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

        function onInit() {
            initMap();
        }

        function onChanges(changes){
            var previous = changes.markers.previousValue.length;
            if(changes.markers.currentValue && map){
                if(markers){
                    markers.forEach(function (marker) {
                        marker.setMap(null);
                    })
                }
                if(previous){
                    search = true;
                }
                setMarkers(changes.markers.currentValue);
                if(previous){
                    setBounds();
                }
            }
        }

        function initMap() {
            var mapContainer = document.createElement('div');
            mapContainer.classList.add('map-section__map');
            $element.append(mapContainer);
            map = new google.maps.Map(mapContainer, vm.options || mapOptions);
            map.mapTypes.set('styled_map', mapStyle);

        }

        function setMarkers(places){
            places.forEach(function (place) {
                $timeout(function(){
                    var position = eval("(" + place.position + ")");

                    marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: place.title,
                        animation: vm.animation && search ? google.maps.Animation.DROP : null,
                        icon: iconsForMarkers[place.category].icon
                    });
                    google.maps.event.addListener(marker, 'click', (function(marker){
                        return function() {
                            infowindow.setContent("<div class='marker-description'>" +
                                "<p class='marker-description__text'>" + place.title + "</p>" +
                                "<p class='marker-description__text'>" + place.place + "</p>" +
                                "<a href=" + place.hyperlink + " target='_blank'>Więcej</a>" +
                                "</div>");
                            infowindow.open(map, marker);
                        }
                    })(marker));
                    markers.push(marker);
                }, (vm.randomAnimation && search) ? Math.floor(Math.random() * 1000) : 0)

            });
        }

        function setBounds(){
            var bounds = new google.maps.LatLngBounds();
            markers.forEach(function (marker) {
               bounds.extend(marker.getPosition());
            });
            map.fitBounds(bounds);
        }
    }
})();