app.component("semiFinals", {
    templateUrl: "./components/semiFinals/semiFinalsTemplate.html",
    controller: ["DataService", SemiFinalsController]
});

function SemiFinalsController(DataService) {

    var ctrl = this;

    ctrl.matches = function () {
        return DataService.getKnockoutMatches("round_4");
    }
}