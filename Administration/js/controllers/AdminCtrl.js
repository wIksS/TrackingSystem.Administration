
app.controller('AdminCtrl', ['$scope', '$location', '$routeParams', 'auth', 'identity', 'notifier',
    function ($scope, $location, $routeParams, auth, identity, notifier) {

    $scope.isLogged = identity.isLogged();
    $scope.isAdmin = identity.isAdmin();
    $scope.id = $routeParams.id;

    $(window).unbind('scroll');
    $('.navbar-default').addClass('on');

    $scope.$on('$routeChangeStart', function (next, current) {
        $scope.isLogged = identity.isLogged();
        $scope.isAdmin = identity.isAdmin();
        $scope.isTeacher = identity.isInRole('Teacher');

        if (!$scope.isAdmin) {
            $location.path('/unauthorized');
        }
    });

    if (!$scope.isAdmin) {
        $location.path('/');
    }
}]);