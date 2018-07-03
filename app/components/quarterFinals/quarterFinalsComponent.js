app.component("quarterFinals", {
    templateUrl: "./components/quarterFinals/quarterFinalsTemplate.html",
    controller: ["DataService", QuarterFinalsController]
});

function QuarterFinalsController(DataService) {

    var ctrl = this;

    ctrl.matches = function () {
        return DataService.getKnockoutMatches("round_8");
    }
}