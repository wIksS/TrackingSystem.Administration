app.factory('pathsService',['$http','$q','baseUrl','httpRequester','objectToQueryString',function($http,q,baseUrl,httpRequester,objectToQueryString) {
    var url = baseUrl + '/api';
    var directionsObj = {};
    var travelMode = google.maps.TravelMode.WALKING;

    return {
        getUserLocations: function (id, identity) {
            return httpRequester.getAuthorized(
                url + "/Path/" + id,
                identity
            );
        },
        // gets the current map and sets it to the directions API of google
        getGoogleMapsService: function (map) {
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;

            directionsDisplay.setMap(map);

            return {
                directionsService: directionsService,
                directionsDisplay: directionsDisplay
            };
        },
        getTravelMode: function () {
            return travelMode;
        },
        setTravelMode: function (mode) {
            travelMode = mode;
            
            return mode;
        }
    }
}]);