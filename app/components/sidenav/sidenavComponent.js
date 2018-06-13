app.component("sidenav", {
    templateUrl: "./components/sidenav/sidenavTemplate.html",
    controller: ["$mdSidenav", "RouteService", SidenavController]
});

function SidenavController ($mdSidenav, RouteService) {

    var ctrl = this;

    ctrl.routes = RouteService.getRoutes();
    ctrl.changeRoute = function (route) {
        RouteService.setRoute(route);
        $mdSidenav("left").close();
    };
    ctrl.isActiveRoute = function (route) {
        if(route.id === RouteService.getRoute().id){
            return true;
        }
    }
}