/**
 * Created by Виктор on 27.9.2014 г..
 */

app.controller('LoginCtrl', ['$scope', 'auth', 'identity', 'notifier', '$timeout', '$location', 'teacherService', 'errorHandler',
    function ($scope, auth, identity, notifier, $timeout, $location, teacherService, errorHandler) {
        var user = identity.getUser();
        $scope.isLogged = identity.isLogged();
        $scope.isAdmin = identity.isAdmin();
        $scope.isTeacher = identity.isInRole('Teacher');
        $scope.user = user || {};
        $scope.username = user.username;

        $scope.$on('$routeChangeStart', function (next, current) {
            user = identity.getUser();

            $scope.isLogged = identity.isLogged();
            $scope.isAdmin = identity.isAdmin();
            $scope.isTeacher = identity.isInRole('Teacher');
            $scope.user = $scope.user || {};
            $scope.username = user.username;
        });

        $scope.login = function (user) {
            auth.login(user)
                .then(function (data) {
                    identity.loginUser(data)
                    .then(function (data) {
                        $scope.isLogged = identity.isLogged();
                        var user = identity.getUser();
                        $scope.username = user.username;
                        $scope.isAdmin = identity.isAdmin();
                        $scope.isTeacher = identity.isInRole('Teacher');

                        $location.path('#/home');
                        $scope.$apply();
                        notifier.success('Successful login !');
                        //initLinksAnimations();
                    });
                },
                function (err) {
                    errorHandler.handle(err);
                });
        };

        $scope.logout = function () {
            $location.path('home');
            var user = identity.getUser();
            identity.logoutUser();
            $scope.isLogged = identity.isLogged();
            $scope.isAdmin = identity.isAdmin();
            $scope.user.username = '';
            $scope.user.password = '';
            notifier.success('Successful logout');
            //initLinksAnimations();
        }
    }]);