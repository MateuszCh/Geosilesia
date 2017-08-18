(function(){
    angular.module('geosilesia').component('searchMap', {
        templateUrl: 'html/components/search-map.html',
        controllerAs: 'vm',
        controller: SearchMapController
    });

    SearchMapController.$inject = ['iconsForMarkers', '$http', '$scope', '$q'];

    function SearchMapController(iconsForMarkers, $http, $scope, $q){
        var vm = this;
        vm.$onInit = onInit;
        vm.categories = iconsForMarkers;
        vm.search = search;
        vm.pickCategory = pickCategory;
        vm.location = "";
        vm.category = "";
        var geocoder = new google.maps.Geocoder();

        function onInit(){
            $http.get("json/markers.json").then(function (response) {
                vm.places = response.data.obiekty;
                vm.markers = vm.places.slice();
            });
        }

        function search(input){
            vm.location = "";
            vm.category = "";
            getCoordinates(input).then(function(coordinates){
                sortByDistance(coordinates);
                nearestPlaces(10);
            }, function(status){
                vm.geocodeErrorMessage = status;
            });
        }

        function getCoordinates(input){
            var q = $q.defer();
            geocoder.geocode({'address': input}, function(results, status){
                if(status === "OK"){
                    var coordinates = {lat: results[0].geometry.location.lat(),
                                       lng: results[0].geometry.location.lng()};
                    q.resolve(coordinates);
                } else {
                    q.reject(status);
                }
            });
            return q.promise;
        }

        function sortByDistance(coors) {
            vm.places.forEach(function (place) {
                place.distance = getDistance(coors.lat, coors.lng, place.position.lat, place.position.lng);
            });
            vm.places.sort(function (a, b) {
                return a.distance - b.distance;
            })
        }

        function nearestPlaces(qty){
            vm.markers = vm.places.slice(0, qty);
        }

        function pickCategory(input){
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
    }
})();