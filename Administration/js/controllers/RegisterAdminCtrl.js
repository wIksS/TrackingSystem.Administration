app.controller('RegisterAdminCtrl', ['$scope', '$location', '$routeParams', 'usersService', 'auth', 'identity', 'notifier', 'errorHandler',
    function ($scope, $location, $routeParams, usersService, auth, identity, notifier, errorHandler) {
        if ($routeParams.id) {
            $scope.isUpdate = true;
            var user = identity.getUser();
            usersService.getUser($routeParams.id, user.token)
                .then(function (data) {
                    $scope.user.email = data.UserName;
                }, function (err) {
                    errorHandler.handle(err);
                });
        }

        $scope.register = function (user) {
            auth.register(user)
                .then(function (data) {
                    notifier.success('Successful registration !');
                }, function (err) {
                    errorHandler.handle(err);
                });
        }

        $scope.update = function (user) {
            usersService.updateUser(user, identity.getUser().token)
                .then(function (data) {
                    notifier.success('Successful update user !');
                }, function (err) {
                    errorHandler.handle(err);
                });
        }

    }])
