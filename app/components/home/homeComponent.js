app.component("home", {
    templateUrl: "./components/home/homeTemplate.html",
    controller: ["DataService", HomeController]
});

function HomeController(DataService) {

    var ctrl = this;

    ctrl.nextMatches = DataService.getNextMatches;
}