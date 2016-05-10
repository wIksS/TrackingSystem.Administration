app.controller('RegisterCtrl', ['$scope', '$location', 'auth', 'identity', 'notifier', 'errorHandler','$timeout',
function ($scope, $location, auth, identity, notifier, errorHandler,$timeout) {
    $timeout(function () {
        $('#register-overlay').modal('show');
    });

    $scope.register = function (user) {
        auth.register(user)
        .then(function (data) {
            notifier.success('Successful registration !');
            $location.path('/');
            auth.login({
                username: user.email,
                password: user.password
            });
        }, function (err) {
            errorHandler.handle(err);
        });
    }
}])