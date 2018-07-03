app.component("finals", {
    templateUrl: "./components/finals/finalsTemplate.html",
    controller: ["DataService", FinalsController]
});

function FinalsController(DataService) {

    var ctrl = this;

    ctrl.matches = function () {
        return DataService.getKnockoutMatches("round_2");
    };

    ctrl.matchesLoser = function () {
        return DataService.getKnockoutMatches("round_2_loser");
    }
}