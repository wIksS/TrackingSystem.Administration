app.controller('GroupCtrl', ['$scope', 'identity', '$routeParams','baseUrl', 'notifier', 'errorHandler', 'groupService',
    function ($scope, identity, $routeParams, baseUrl, notifier, errorHandler, groupService) {
        $scope.isLogged = identity.isLogged();
        $scope.isAdmin = identity.isAdmin();
        var user = identity.getUser();
        $scope.serverImagePath = baseUrl + "/api/file/";
        $scope.min = 1;
        $scope.max = 1000;
        $scope.currentDistance = 50;
        var self = $scope;
        var isMade = false;

        $scope.changeGroupDistance = function (distance) {
            groupService.changeGroupDistance(distance, user.token, $routeParams.id)
                .then(function (data) {
                    notifier.success("Changed the distance of the group to : " + distance)
                }, function (err) {
                    errorHandler.handle(err);
                });
        }

        $scope.updateSlider = function (min, max) {
            if (isMade) {
                $('#slider').slider('destroy');
            }
            min = min | 0;
            max = max | 0;
            isMade = true;

            $('#slider').slider({
                orientation: "horizontal",
                range: false,
                min: min,
                max: max,
                value: 0,
                animate: true,
                slide: function (q, ui) {
                    setCurrentDistance(ui.value);
                    self.$apply();
                }
            });
        }

        var setCurrentDistance = function (value) {
            $scope.currentDistance = value;
        }

        groupService.getAllStudentsInGroup(user.token, $routeParams.id)
            .then(function (data) {
                $scope.usersInGroup = data;
            }, function (err) {
                errorHandler.handle(err);
            });
    }
]);