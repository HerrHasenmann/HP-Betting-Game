app.service("RuleService", [function () {

    var serv = this;

    serv.getPoints = function (data) {

        var homeTeam = data.homeTeam;
        var awayTeam = data.awayTeam;
        var guessHome = data.guessHome;
        var guessAway = data.guessAway;

        if (homeTeam === null || awayTeam === null || guessHome === null || guessAway === null) {
            //case some missing data
            return 0
        }

        if (isGuessExact(data)) {
            return 4;
        } else if (isGoalDifferenceExact(data)) {
            return 3;
        } else if (isWinnerGuessedExact(data)) {
            return 2;
        } else {
            return 0;
        }
    };

    function isGuessExact(data) {
        var homeTeam = data.homeTeam;
        var awayTeam = data.awayTeam;
        var guessHome = data.guessHome;
        var guessAway = data.guessAway;

        return (homeTeam === guessHome && awayTeam === guessAway);
    }

    function isGoalDifferenceExact(data) {
        var homeTeam = data.homeTeam;
        var awayTeam = data.awayTeam;
        var guessHome = data.guessHome;
        var guessAway = data.guessAway;

        var winner = homeTeam > awayTeam ? "homeTeam" : ( awayTeam > homeTeam ? "awayTeam" : null );
        var difference;
        var guessedDifference;
        if (winner === null) {
            //case draw
            return guessHome === guessAway;
        } else if (winner === "homeTeam") {

            difference = homeTeam - awayTeam;
            guessedDifference = guessHome - guessAway;

            return difference === guessedDifference;

        } else if (winner === "awayTeam") {

            difference = awayTeam - homeTeam;
            guessedDifference = guessAway - guessHome;

            return difference === guessedDifference;

        }
    }

    function isWinnerGuessedExact(data){
        var homeTeam = data.homeTeam;
        var awayTeam = data.awayTeam;
        var guessHome = data.guessHome;
        var guessAway = data.guessAway;

        var winner = homeTeam > awayTeam ? "homeTeam" : ( awayTeam > homeTeam ? "awayTeam" : null );
        if (winner === null) {
            //case draw
            return false;
        } else if (winner === "homeTeam") {

            return guessHome > guessAway;

        } else if (winner === "awayTeam") {

            return guessAway > guessHome;

        }
    }
}]);