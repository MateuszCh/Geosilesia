(function(){
    angular.module('geosilesia').component('searchMap', {
        templateUrl: 'html/components/search-map.html',
        controllerAs: 'vm',
        controller: SearchMapController
    });

    SearchMapController.$inject = ['$http', '$q', '$rootScope', '$document', '$element', '$timeout', 'gmapConfig', 'iconsForMarkers'];

    function SearchMapController($http, $q, $rootScope, $document, $element, $timeout, gmapConfig, iconsForMarkers){
        var vm = this;
        vm.$onInit = onInit;
        vm.search = search;
        vm.pickCategory = pickCategory;
        vm.toggleSearchPanel = toggleSearchPanel;
        vm.increaseSearchQty = increaseSearchQty;
        vm.setCurrentResult = setCurrentResult;
        vm.categories = iconsForMarkers;
        vm.showSearch = false;
        vm.showMore = false;
        vm.searchInput = "";
        vm.category = "";
        vm.currentResult = undefined;
        var searchQty = 10;
        var searchForm = document.getElementById('search-form');

        function onInit(){
            if(!(angular.isDefined(window.google) && angular.isDefined(window.google.maps))){
                loadGoogleMaps();
            }
            // $http.get("/api/markers").then(function (response) {
            //     vm.places = response.data.obiekty;
            //     vm.markers = vm.places.slice();
            //     vm.markers.sort(function (a, b) {
            //         return b.position.lat - a.position.lat;
            //     });
            // });
            $http.get("json/markers.json").then(function (response) {
                vm.places = response.data.obiekty;
                vm.markers = vm.places.slice();
                vm.markers.sort(function (a, b) {
                    return b.position.lat - a.position.lat;
                });
            });
        }

        function loadGoogleMaps(){
            var script = document.createElement('script');
            script.src = "https://maps.googleapis.com/maps/api/js?key=" + gmapConfig.key;
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        function toggleSearchPanel(){
            if(window.innerWidth > 849) {
                vm.showSearch ? vm.showSearch = false : vm.showSearch = true;
            } else {
                $document.scrollToElementAnimated(searchForm);
            }
        }

        function search(input){
                searchQty = 10;
                vm.searchInput = "";
                vm.category = "";
                getCoordinates(input).then(function(result){
                    if(window.innerWidth < 850){
                        $document.scrollToElementAnimated($element);
                    }
                    vm.location = getLocationDetails(result);
                    sortByDistance(vm.location.position.lat, vm.location.position.lng);
                    nearestPlaces();
                    vm.markers.push(vm.location);
                    vm.showMore = true;
                    vm.currentResult = undefined;
                }, function(status){
                    vm.geocodeErrorMessage = status;
                });
        }

        function getCoordinates(input){
            var q = $q.defer();
            var geocoder = new google.maps.Geocoder();
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
                    lat : parseFloat(address.geometry.location.lat().toFixed(8)),
                    lng : parseFloat(address.geometry.location.lng().toFixed(8))
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
            return R * c;
        }

        function deg2rad(deg){
            return deg * (Math.PI/180);
        }

        function nearestPlaces(){
            vm.markers = vm.places.slice(0, searchQty);
        }

        function increaseSearchQty(){
            searchQty = searchQty + 10;
            nearestPlaces();
            if(searchQty > vm.places.length){
                vm.showMore = false;
            }
        }

        function pickCategory(input){
            vm.showMore = false;
            searchQty = 10;
            vm.location = null;
            vm.searchInput = "";
            vm.currentResult = undefined;
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
            vm.markers.sort(function (a, b) {
                return b.position.lat - a.position.lat;
            });
            if(window.innerWidth < 850){
                $document.scrollToElementAnimated($element);
            }
        }

        function setCurrentResult(index){
            vm.currentResult = vm.currentResult === index ? undefined : index;

            if(window.innerWidth < 850){
                $document.scrollToElementAnimated($element);
            }
        }

    }
})();