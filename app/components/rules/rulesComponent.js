app.component("rules", {
    templateUrl: "./components/rules/rulesTemplate.html",
    controller: [RulesController]
});

function RulesController() {

    var ctrl = this;

    ctrl.rules = [
        "Für das exakt getippte Ergebnis gibt es 4 Punkte.",
        "Für die richtig getippte Tordifferenz gibt es 3 Punkte.",
        "Wenn der Gewinner richtig getippt wurde gibt es 2 Punkte.",
        "Getippt werden kann bis zum Anstoß des jeweiligen Spieles."
    ]
}