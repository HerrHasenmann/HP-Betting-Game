app.component("home", {
    templateUrl: "./components/home/homeTemplate.html",
    controller: ["DataService", HomeController]
});

function HomeController(DataService) {

    var ctrl = this;

    ctrl.nextMatches = DataService.getNextMatches;
    ctrl.previousMatches = DataService.getPreviousMatches;

    ctrl.isMatchFinished = function (match) {
        var currentMoment = moment();
        var kickOffMoment = moment(match.date).local();
        var differenceInMinutes = currentMoment.diff(kickOffMoment, "minutes");

        if(differenceInMinutes >= 120){
            return true;
        }
    };
}