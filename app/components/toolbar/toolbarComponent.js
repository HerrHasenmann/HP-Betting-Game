app.component("toolbar", {
    templateUrl: "./components/toolbar/toolbarTemplate.html",
    controller: ["$mdSidenav", "$mdDialog", "$mdMedia", "$mdToast", "RouteService", "AuthenticationService", ToolbarController]
});

function ToolbarController($mdSidenav, $mdDialog, $mdMedia, $mdToast, RouteService, AuthenticationService) {

    var ctrl = this;

    ctrl.toggleSidenav = function () {
        $mdSidenav('left').toggle();
    };

    ctrl.title = function () {
        return RouteService.getRoute().name;
    };

    ctrl.showRules = function (event) {
        $mdDialog.show({
            template: '<rules></rules>',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            escapeToCLose: true,
            fullscreen: false
        })
    };

    ctrl.name = function () {
        return AuthenticationService.getUser().name;
    };

    ctrl.logout = function () {
        AuthenticationService.logout().then(function () {
            $mdToast.show($mdToast.simple()
                .content("Du hast dich erfolgreich ausgeloggt.")
                .position('bottom right'));
        })
    }
}