(function(){
    angular.module('geosilesia').component('map', {
        bindings: {
            places: '<',
            options: '<',
            centerMap: '<'
        },
        controllerAs: 'vm',
        controller: MapController
    });

    MapController.$inject = ['mapStyle', 'iconsForMarkers', '$element', '$timeout', '$window'];
    function MapController(mapStyle, iconsForMarkers, $element, $timeout, $window){

        var vm = this;
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        var map, marker;
        var infowindow = new google.maps.InfoWindow();
        var currentMarker;
        var currentCenter;
        vm.markers = [];

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
            deleteMarkers();
            initMap();
            $window.addEventListener('resize', function(){
                map.setCenter(currentCenter);
                currentCenter = map.getCenter();
            })
        }

        function onChanges(changes){
            if(changes.places && changes.places.currentValue && map){
                if(vm.markers.length){
                    deleteMarkers();
                }
                setMarkers();
                setBounds();
            }
            if(changes.centerMap && map){
                $timeout(function(){
                    google.maps.event.trigger(map, "resize");
                    map.setCenter(currentCenter);
                    currentCenter = map.getCenter();
                }, 1010);
            }
        }

        function deleteMarkers(){
            vm.markers.forEach(function(marker){
                marker.setMap(null);
            });
            vm.markers = [];
        }

        function initMap() {
            var mapContainer = document.createElement('div');
            mapContainer.classList.add('search__container__map');
            $element.append(mapContainer);
            map = new google.maps.Map(mapContainer, vm.options || mapOptions);
            map.mapTypes.set('styled_map', mapStyle);
            currentCenter = map.getCenter();
        }

        function setMarkers(){
            vm.places.forEach(function (place) {
                    var latitude = Number(place.position.lat);
                    var longitude = Number(place.position.lng);
                    var position = {lat: latitude, lng: longitude};
                    marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: place.title,
                        animation: google.maps.Animation.DROP,
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
                            toggleBounce(marker);
                            currentMarker = marker;
                        }
                    })(marker));
                    google.maps.event.addListener(infowindow, 'closeclick', function(){
                        toggleBounce(currentMarker);
                    });
                    vm.markers.push(marker);
            });
        }

        function setBounds(){
            var bounds = new google.maps.LatLngBounds();
            vm.markers.forEach(function (marker) {
                bounds.extend(marker.getPosition());
            });
            map.fitBounds(bounds);
            if(vm.markers.length === 1){
                map.setZoom(16);
            }
            currentCenter = map.getCenter();
        }

        function toggleBounce(mar) {
            var active = mar.getAnimation() !== null;
            vm.markers.forEach(function (marker) {
                marker.setAnimation(null);
            });
            active ? mar.setAnimation(null) : mar.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
})();