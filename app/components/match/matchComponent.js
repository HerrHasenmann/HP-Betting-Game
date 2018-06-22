app.component("match", {
    templateUrl: "./components/match/matchTemplate.html",
    controller: ["$rootScope", "DataService", "UserService", "RuleService", "AuthenticationService", MatchController],
    bindings: {
        match: "<"
    }
});

function MatchController($rootScope, DataService, UserService, RuleService, AuthenticationService) {

    var ctrl = this;
    ctrl.homeTeam = null;
    ctrl.awayTeam = null;

    ctrl.guessHome = null;
    ctrl.guessAway = null;
    ctrl.guessPoints = 0;

    ctrl.getKickOffDate = function () {
        return moment(ctrl.match.date).local().format("LLLL");
    };

    ctrl.isMatchFinished = function () {
        var currentMoment = moment();
        var kickOffMoment = moment(ctrl.match.date).local();
        var differenceInMinutes = currentMoment.diff(kickOffMoment, "minutes");

        if(differenceInMinutes >= 120){
            return true;
        }
    };

    ctrl.isMatchStarted = function () {
        var currentMoment = moment();
        var kickOffMoment = moment(ctrl.match.date).local();
        var differenceInMinutes = currentMoment.diff(kickOffMoment, "minutes");

        if(differenceInMinutes >= 0){
            return true;
        }
    };

    ctrl.isGuessed = function (guess) {
        if(ctrl.guessHome >= 0 && ctrl.guessAway >= 0 && ctrl.guessHome !== null && ctrl.guessAway !== null){
            return true;
        }
    };

    ctrl.setBetting = function (team, guess) {
        var user = AuthenticationService.getUser();
        var matchBettingRef = firestore.doc("users/"+user.uid+"/bettings/"+ctrl.match.name);
        var data = {};
        data[team] = guess;

        matchBettingRef.set(data, { merge: true })
    };

    ctrl.$onInit = function () {
        ctrl.homeTeam = DataService.getTeam(ctrl.match.home_team);
        ctrl.awayTeam = DataService.getTeam(ctrl.match.away_team);

        var user = AuthenticationService.getUser();
        var matchBettingRef = firestore.doc("users/"+user.uid+"/bettings/"+ctrl.match.name);
        matchBettingRef.get().then(function (doc) {
            if (doc.exists) {
                refreshBetting(doc.data())
            }
            matchBettingRef.onSnapshot(function (doc) {
                if (doc.exists) {
                    refreshBetting(doc.data())
                }
            })
        });
    };

    function refreshBetting(betting) {
        $rootScope.safeApply(function () {
            if(betting.homeTeam || betting.homeTeam === 0){
                ctrl.guessHome = betting.homeTeam;
            }else{
                ctrl.guessHome = null;
            }
            if(betting.awayTeam || betting.awayTeam === 0){
                ctrl.guessAway = betting.awayTeam;
            }else{
                ctrl.guessAway = null;
            }

            ctrl.guessPoints = RuleService.getPoints({
                "homeTeam": ctrl.match.home_result,
                "awayTeam": ctrl.match.away_result,
                "guessHome": ctrl.guessHome,
                "guessAway": ctrl.guessAway
            });
        })
    }
}