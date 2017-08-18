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
        var places;
        var geocoder = new google.maps.Geocoder();
        vm.test = [];

        function onInit(){
            $http.get("json/markers.json").then(function (response) {
                places = response.data.obiekty;
                vm.markers = places.slice();
            });
        }

        function search(input){
            vm.location = "";
            getCoordinates(input, nearestPlaces);
        }

        function getCoordinates(input, callback){
            geocoder.geocode({'address': input}, function(results, status){
                if(status === "OK"){
                    var lat = results[0].geometry.location.lat();
                    var lng = results[0].geometry.location.lng();
                    callback(lat, lng);
                } else {
                    console.log(status);
                }
            })
        }

        function nearestPlaces(lat, lng){
            // vm.markers = [];
            // var place = {position: {lat: lat, lng: lng}, title: "akacjowa", place: "akacjowa", category: "trasyPodziemne"};
            // vm.markers.push(place);
            // $scope.$apply();
            places.forEach(function (place) {
                // console.log(getDistance(lat, lng, place.position.lat, place.position.lng));
                place.distance = getDistance(lat, lng, place.position.lat, place.position.lng);
            });
            console.log(places);
            places.sort(function(a, b){
                return a.distance - b.distance;
            })
            console.log(places);
            vm.markers = places.slice(0, 10);
            $scope.$apply();


        }

        function pickCategory(input){
            vm.markers = [];
            places.slice().forEach(function(place){
                if(place.category === input){
                    vm.markers.push(place);
                }
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
    }
})();