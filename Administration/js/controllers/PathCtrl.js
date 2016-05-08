app.controller('PathCtrl', ['$scope', '$routeParams', 'auth', 'identity', 'baseUrl', 'notifier', 'errorHandler','pathsService',
    function ($scope, $routeParams, auth, identity, baseUrl, notifier, errorHandler, pathsService) {
        $scope.isLogged = identity.isLogged();
        $scope.isAdmin = identity.isAdmin();
        var user = identity.getUser();
        $scope.isLoading  = true;
        var markerId = 0;
        $scope.serverImagePath = baseUrl + "/api/file/";
        var domMap = document.getElementById('map');
        domMap.style.height = $(window).height() - 30 + 'px';

        if (!$scope.isAdmin) {
            $location.path('/unathorized');
        }

        $scope.paths = pathsService.getUserLocations($routeParams.id, user.identity)
            .then(function (data) {
                if (data.length == 0) {
                    $scope.noLocations = true;
                    $scope.isLoading = false;
                    $scope.$apply();
                    
                    return;
                }
                 
                var map = new google.maps.Map(domMap, {
                    center: { lat: data[0].Latitude, lng: data[0].Longitude },
                    zoom: 8
                });
                var directions = pathsService.getGoogleMapsService(map);

                for (var i = 0; i < data.length; i++) {
                    var marker = new google.maps.Marker({
                        position: { lat: data[i].Latitude, lng: data[i].Longitude },
                        map: map,
                        animation: google.maps.Animation.DROP,
                        title: 'Location'
                    });

                    var wayPoints = [];
                    wayPoints.push({
                        location: { lat: data[i].Latitude, lng: data[i].Longitude },
                        stopover: true
                    });
                }

                directions.directionsService.route({
                    origin: { lat: data[0].Latitude, lng: data[0].Longitude },
                    destination: { lat: data[data.length - 1].Latitude, lng: data[data.length - 1].Longitude},
                    waypoints:wayPoints,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.WALKING
                }, function (response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directions.directionsDisplay.setDirections(response);
                    } else {
                        notifier.error("No route found");
                    }
                });                

                $scope.isLoading = false;
                $scope.$apply();
            }, function (err) {
                errorHandler.handle(err);
            });
    }
]);