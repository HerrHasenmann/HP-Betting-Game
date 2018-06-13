app.controller("AuthenticationController", ["AuthenticationService", function (AuthenticationService) {

    var ctrl = this;

    ctrl.isAuthenticated = AuthenticationService.isAuthenticated;
    ctrl.isAuthenticationReady = AuthenticationService.isReady;
}]);