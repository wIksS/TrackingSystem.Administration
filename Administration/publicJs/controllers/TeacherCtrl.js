/**
 * Created by Виктор on 4.10.2014 г..
 */
/**
 * Created by Виктор on 2.10.2014 г..
 */
publicApp.controller('TeacherCtrl', ['$scope', 'baseUrl', 'notifier', 'teacherService', 'errorHandler',
    function ($scope, baseUrl, notifier, teacherService, errorHandler) {
    $scope.serverImagePath = baseUrl + "/api/file/";
    $scope.isLoading = true;
   // $scope.teacher = currentTeacher.getSessionTeacher();

    teacherService.getTeachers()
        .then(function (data) {
            $scope.teachers = data;
            $scope.isLoading = false; 
        }, function (err) {
            errorHandler.handle(err);
        });

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