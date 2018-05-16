(function(){
    angular.module('geosilesia').component('map', {
        bindings: {
            places: '<',
            centerMap: '<',
            currentResult: '<',
            markerCluster: '<',
            categories: '<',
            activeCategory: '<'
        },
        controllerAs: 'vm',
        controller: MapController,
        template: '<div class="search__container__map"></div>'
    });

    MapController.$inject = ['$timeout', '$element', '$interval', 'mapStyle'];
    function MapController($timeout, $element, $interval, mapStyle){

        var vm = this;
        vm.$onInit = onInit;
        vm.$onDestroy = onDestroy;
        vm.$onChanges = onChanges;
        var map, currentCenter, centering, stopping, markerCluster, markers = [];

        function onInit() {
            initMap();
        }

        function onChanges(changes){
            if(map){
                if(changes.places && changes.places.currentValue){
                    updateMarkers();
                }
                if(changes.centerMap){
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
                    updateMarkers();
                    var resultMarker = markers[changes.currentResult.currentValue];
                    map.setZoom(18);
                    map.panTo(resultMarker.position);
                    currentCenter = map.getCenter();
                    google.maps.event.trigger(resultMarker, "click");
                }
            }
        }

        function onDestroy(){
            window.removeEventListener('resize', centerMap);
        }

        function gmapApiReady(){
            return angular.isDefined(window.google) && angular.isDefined(window.google.maps);
        }

        function initMap() {
            if(gmapApiReady()){
                var mapContainer = $element[0].firstChild;
                map = new google.maps.Map(mapContainer, {
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
                });
                map.mapTypes.set('styled_map', new google.maps.StyledMapType(mapStyle.style, mapStyle.name));
                currentCenter = map.getCenter();
                vm.places && updateMarkers();
                window.addEventListener('resize', centerMap);
                google.maps.event.addListener(map, 'dragend', function(){
                    currentCenter = map.getCenter();
                });
                return;
            }
            $timeout(initMap, 10);
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
                if(!(place.position.lat && place.position.lng && (place.title || place.type))){
                    return;
                }
                var latitude = Number(place.position.lat);
                var longitude = Number(place.position.lng);
                var position = {lat: latitude, lng: longitude};

                var icon;

                if(place.type || !place.categories || !place.categories.length){
                    icon = "";
                } else if(!vm.activeCategory || vm.activeCategory === 'all'){
                    icon = vm.categories[place.categories[0]].icon;
                } else {
                    icon = vm.categories[vm.activeCategory].icon;
                }

                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: place.title || "",
                    icon: icon
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
                                "<p class='marker-description__text'>" + place.position.lat + ", " + place.position.lng + "</p>" +
                                "<a href=" + place.hyperlink + " target='_blank'>Więcej</a>" +
                                "</div>");
                        }
                        infowindow.open(map, marker);
                    }
                })(marker));
                markers.push(marker);
            });
            if(markerCluster){
                markerCluster.clearMarkers();
            }

            if(vm.markerCluster){
                markerCluster = new MarkerClusterer(map, markers, {
                    imagePath: 'images/markers/'
                });
                google.maps.event.addListener(markerCluster, 'clusterclick', function(){
                    $timeout(function(){
                        currentCenter = map.getCenter();
                    }, 100);
                })
            }
        }

        function setBounds(){
            var bounds = new google.maps.LatLngBounds();
            markers.forEach(function (marker) {
                bounds.extend(marker.getPosition());
            });
            if(bounds.b.f < bounds.b.b){
                var longitude1 = bounds.b.f;
                bounds.b.f = bounds.b.b;
                bounds.b.b = longitude1;
            }
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