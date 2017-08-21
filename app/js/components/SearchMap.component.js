(function(){
    angular.module('geosilesia').component('searchMap', {
        templateUrl: 'html/components/search-map.html',
        controllerAs: 'vm',
        controller: SearchMapController
    });

    SearchMapController.$inject = ['iconsForMarkers', '$http', '$q', '$rootScope', '$document', '$element'];

    function SearchMapController(iconsForMarkers, $http, $q, $rootScope, $document, $element){
        var vm = this;
        vm.$onInit = onInit;
        vm.search = search;
        vm.pickCategory = pickCategory;
        vm.toggleSearchPanel = toggleSearchPanel;
        vm.categories = iconsForMarkers;
        vm.showSearch = false;
        vm.searchInput = "";
        vm.category = "";
        var geocoder = new google.maps.Geocoder();

        function onInit(){
            $http.get("json/markers.json").then(function (response) {
                vm.places = response.data.obiekty;
                vm.markers = vm.places.slice();
            });
        }

        function toggleSearchPanel(){
            if($rootScope.isL || $rootScope.isX) {
                vm.showSearch ? vm.showSearch = false : vm.showSearch = true;
            } else {
                $document.scrollToElementAnimated(document.getElementById('search-form'));
            }

        }

        function search(input){
            vm.searchInput = "";
            vm.category = "";
            getCoordinates(input).then(function(result){
                if($rootScope.isS){
                    $document.scrollToElementAnimated($element);
                }
                vm.location = getLocationDetails(result);
                sortByDistance(vm.location.position.lat, vm.location.position.lng);
                nearestPlaces(10);
                vm.markers.push(vm.location);
            }, function(status){
                vm.geocodeErrorMessage = status;
            });

        }

        function getCoordinates(input){
            var q = $q.defer();
            geocoder.geocode({'address': input}, function(results, status){
                if(status === "OK"){
                    q.resolve(results[0]);
                } else {
                    q.reject(status);
                }
            });
            return q.promise;
        }

        function getLocationDetails(address){
            return {
                position: {
                    lat : address.geometry.location.lat(),
                    lng : address.geometry.location.lng()
                },
                address : address.formatted_address,
                type: 'home'
            };
        }

        function sortByDistance(lat, lng) {
            vm.places.forEach(function (place) {
                place.distance = getDistance(lat, lng, place.position.lat, place.position.lng);
            });
            vm.places.sort(function (a, b) {
                return a.distance - b.distance;
            })
        }

        function getDistance(lat1, lng1, lat2, lng2){
            var R = 6371;
            var dLat = deg2rad(lat2-lat1);
            var dLng = deg2rad(lng2-lng1);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng/2) * Math.sin(dLng/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;
            return d;
        }

        function deg2rad(deg){
            return deg * (Math.PI/180);
        }

        function nearestPlaces(qty){
            vm.markers = vm.places.slice(0, qty);
        }

        function pickCategory(input){
            vm.location = null;
            vm.searchInput = "";
            if(input === 'all'){
                vm.markers = vm.places.slice();
            } else {
                vm.markers = [];
                vm.places.slice().forEach(function(place){
                    if(place.category === input){
                        vm.markers.push(place);
                    }
                })
            }
            if($rootScope.isS || $rootScope.isM){
                $document.scrollToElementAnimated($element);
            }
        }
    }
})();