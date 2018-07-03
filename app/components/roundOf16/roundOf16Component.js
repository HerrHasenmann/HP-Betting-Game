app.component("roundOf16", {
    templateUrl: "./components/roundOf16/roundOf16Template.html",
    controller: ["DataService", RoundOf16Controller]
});

function RoundOf16Controller(DataService) {

    var ctrl = this;

    ctrl.matches = function () {
       return DataService.getKnockoutMatches("round_16");
    }
}