app.directive("guess", [function () {
    return {
        templateUrl: "./directives/guess/guessTemplate.html",
        replace: false,
        require: "?ngModel",
        scope: true,
        link: function (scope, element, attributes, ngModel) {
            scope.model = ngModel;
            scope.guessFormation = [
                [2,3,4],
                [1,0,5],
                [8,7,6]
            ];

            scope.setValue = function (guess) {
                if (ngModel) {
                    ngModel.$setViewValue(guess);
                }
            };

            scope.hasGuess = function () {
                if(ngModel.$viewValue !== null){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
}]);