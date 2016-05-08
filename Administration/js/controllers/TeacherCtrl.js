/**
 * Created by Виктор on 4.10.2014 г..
 */
/**
 * Created by Виктор on 2.10.2014 г..
 */
app.controller('TeacherCtrl', ['$scope','$rootScope', '$location', 'auth', 'identity', 'baseUrl', 'notifier', 'teacherService', 'errorHandler',
    function ($scope, $rootScope, $location, auth, identity, baseUrl, notifier, teacherService, errorHandler) {
    $scope.isLogged = identity.isLogged();
    $scope.isAdmin = identity.isAdmin();
    $scope.serverImagePath = baseUrl + "/api/file/";
    $scope.isLoading = true;
   // $scope.teacher = currentTeacher.getSessionTeacher();
   
    $scope.$on('$routeChangeStart', function (next, current) {
        $scope.isLogged = identity.isLogged();
        $scope.isAdmin = identity.isAdmin();
    });

    $rootScope.$on("searchTeacher", function (event, args) {
        $scope.searchFilter = args.search;
    });

    $scope.searchFunc = function (item) {
        if (!$scope.searchFilter
            || item.FirstName.indexOf($scope.searchFilter) != -1
            || item.LastName.indexOf($scope.searchFilter) != -1
            || item.Email.indexOf($scope.searchFilter) != -1) {
            return true;
        }
        return false;
    };

    teacherService.getTeachers()
        .then(function (data) {
            $scope.teachers = data;
            $scope.isLoading = false; 
        }, function (err) {
            errorHandler.handle(err);
        });

    $scope.isLogged = identity.isLogged();
    $scope.isAdmin = identity.isAdmin();

    $scope.delete = function (id) {
        var user = identity.getUser();
        teacherService.deleteTeacher({ id: id, identity: user.token })
            .then(function (data) {
                window.location.reload();
                notifier.success("Successfuly deleted teacher");
            }, function (err) {
                errorHandler.handle(err);
            });
    }

    $scope.redirectToImageUpload = function (teacherId) {
        $location.path('/Content/UploadImage/' + teacherId);
    }

    $scope.$on('onRepeatLast', function (scope, element, attrs) {
        $("#teachers-carousels").owlCarousel({
            navigation: false, // Show next and prev buttons
            slideSpeed: 300,
            paginationSpeed: 400,
            autoHeight: true,
            itemsCustom: [
                          [0, 1],
                          [450, 2],
                          [600, 2],
                          [700, 2],
                          [1000, 4],
                          [1200, 4],
                          [1400, 4],
                          [1600, 4]
            ],
        });
    });   

}]);