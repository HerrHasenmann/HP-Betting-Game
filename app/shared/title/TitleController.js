app.controller("TitleController", ["$scope", "titleService", function ($scope, titleService) {

    $scope.title = titleService.getTitle;
    function init() {
        titleService.setTitle("WM 2018 Tippspiel");
    }
    init();
}]);