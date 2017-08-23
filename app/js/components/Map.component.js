(function(){
    angular.module('geosilesia').component('map', {
        bindings: {
            places: '<',
            options: '<',
            centerMap: '<',
            currentResult: '<'
        },
        controllerAs: 'vm',
        controller: MapController,
        template: '<div class="search__container__map"></div>'
    });

    MapController.$inject = ['mapStyle', 'iconsForMarkers', '$timeout', '$window', '$element', '$interval', '$rootScope'];
    function MapController(mapStyle, iconsForMarkers, $timeout, $window, $element, $interval, $rootScope){

        var vm = this;
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        var map, currentCenter, centering, stopping, markers = [];

        var mapOptions = {
            center: {
                lat: 50.277978,
                lng: 19.020544
            },
            zoom: 9,
            scrollwheel: false,
            draggable: true,
            mapTypeId: "styled_map",
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
                position: google.maps.ControlPosition.LEFT_TOP,
                mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            scaleControl: true
        };

        function onInit() {
            initMap();
            $window.addEventListener('resize', function(){
                centerMap();
            })
        }

        function initMap() {
            var mapContainer = $element[0].firstChild;
            map = new google.maps.Map(mapContainer, vm.options || mapOptions);
            map.mapTypes.set('styled_map', mapStyle);
            currentCenter = map.getCenter();
        }

        function onChanges(changes){
            if(changes.places && changes.places.currentValue && map){
                updateMarkers();
            }
            if(changes.centerMap && map){
                if(centering && centering.$$state.value !== 'canceled'){
                    $interval.cancel(centering);
                    $timeout.cancel(stopping);
                }
                centering = $interval(function () {
                    centerMap();
                }, 1);
                stopping = $timeout(function () {
                    $interval.cancel(centering);
                }, 1001);
            }
            if(changes.currentResult && changes.currentResult.currentValue !== undefined){
                var resultMarker = markers[changes.currentResult.currentValue];
                google.maps.event.trigger(resultMarker, "click");
            }
        }

        function updateMarkers(){
            if(markers.length){
                deleteMarkers();
            }
            setMarkers();
            setBounds();
        }

        function deleteMarkers(){
            markers.forEach(function(marker){
                marker.setMap(null);
            });
            markers = [];
        }

        function setMarkers(){
            var infowindow = new google.maps.InfoWindow();
            vm.places.forEach(function (place) {
                var latitude = Number(place.position.lat);
                var longitude = Number(place.position.lng);
                var position = {lat: latitude, lng: longitude};
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: place.title || "",
                    animation: $rootScope.isS ? "" : google.maps.Animation.DROP,
                    icon: place.type ? ""  : iconsForMarkers[place.category].icon
                });
                google.maps.event.addListener(marker, 'click', (function(marker){
                    return function() {
                        if(place.type === 'home'){
                            infowindow.setContent("<div class='marker-description'>" +
                                "<p class='marker-description__text'>" + place.address + "</p>" +
                                "<p class='marker-description__text'>" + place.position.lat + ", " + place.position.lng +  "</p>" +
                                "</div>");
                        } else {
                            infowindow.setContent("<div class='marker-description'>" +
                                "<p class='marker-description__text'>" + place.title + "</p>" +
                                "<p class='marker-description__text'>" + place.place + "</p>" +
                                "<p class='marker-description__text'>" + place.position.lat + ", " + place.position.lng + "</p>" +
                                "<a href=" + place.hyperlink + " target='_blank'>Więcej</a>" +
                                "</div>");
                        }
                        infowindow.open(map, marker);
                    }
                })(marker));
                markers.push(marker);
            });
        }

        function setBounds(){
            var bounds = new google.maps.LatLngBounds();
            markers.forEach(function (marker) {
                bounds.extend(marker.getPosition());
            });
            map.fitBounds(bounds);
            if(markers.length === 1){
                map.setZoom(16);
            }
            currentCenter = map.getCenter();
        }

        function centerMap(){
            google.maps.event.trigger(map, "resize");
            map.setCenter(currentCenter);
            currentCenter = map.getCenter();
        }
    }
})();