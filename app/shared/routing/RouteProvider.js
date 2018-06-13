app.provider("RouteService", [function () {
    this.$get = ["$location", function ($location) {
            return new RouteService($location);
        }];

}]);

function RouteService($location) {

    var serv = this;

    var routes = {
        "home": {
            "id": "home",
            "name": "Startseite",
            "template": "<home></home>",
            "icon": "home"
        },
        "groups": {
            "id": "groups",
            "name": "Gruppenhase",
            "template": "<groups></groups>",
            "icon": "account-group"
        },
        "roundOf16": {
            "id": "roundOf16",
            "name": "8-tel Finale",
            "template": "<round-of-16></round-of-16>",
            "icon": "numeric-8-box-multiple-outline"
        },
        "quarterFinals": {
            "id": "quarterFinals",
            "name": "4-tel Finale",
            "template": "<quarter-finals></quarter-finals>",
            "icon": "numeric-4-box-multiple-outline"
        },
        "semiFinals": {
            "id": "semiFinals",
            "name": "Halbfinale",
            "template": "<semi-finals></semi-finals>",
            "icon": "tournament"
        }
        ,
        "finals": {
            "id": "finals",
            "name": "Finale",
            "template": "<finals></finals>",
            "icon": "trophy"
        }
    };

    var defaultRoute = routes["home"];

    var redirects = [
        // Sample
        // {
        //     "when": "test",
        //     "route": routes["default"]
        // }
    ];

    serv.getRoutes = function () {
        return routes
    };

    serv.getDefaultRoute = function () {
        return defaultRoute
    };

    serv.getRedirects = function () {
        return redirects;
    };

    serv.getRoute = function () {
        var path = $location.path();

        if(path === "/"){
            return defaultRoute;
        } else {
            return routes[path.slice(1)];
        }
    };

    serv.setRoute = function (route) {
        if (typeof route === "string") {
            if (route.substring(0, 1) !== "/") {
                route = "/" + route;
            }

            $location.url(route);
        } else if (typeof route === "object") {
            if(route.hasOwnProperty("id")){
                $location.url("/"+route.id);
            }
        } else {
            console.error("Given parameter for RouteService.goto() was nether string nor object");
        }
    }
}