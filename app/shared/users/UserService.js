app.service("UserService", ["$rootScope", "DataService", "RuleService", function ($rootScope, DataService, RuleService) {

    var serv = this;

    //{ userId: user{ bettings{ matchId: match} }}
    var users = null;

    serv.getUsers = function () {
        return users;
    };


    serv.getUser = function (userId) {
        return users[userId];
    };

    serv.getBetting = function (userId, matchId) {
        return users[userId].bettings[matchId];
    };

    function init() {

        DataService.getData().then(function () {
            firestore.collection("users").get().then(function (querySnapshot) {
                //users collection

                users = {};
                querySnapshot.forEach(function (userRef) {
                    //User document
                    var userId = userRef.id;

                    users[userId] = userRef.data();
                    users[userId].bettings = {};
                    users[userId].points = {
                        "4": 0,
                        "3": 0,
                        "2": 0,
                        "sum": 0
                    };

                    firestore.collection("users/"+userRef.id+"/bettings").get().then(function (querySnapshot) {
                        //bettings collection


                        querySnapshot.forEach(function (bettingRef) {
                            //Betting document
                            var matchId = bettingRef.id;
                            var betting = bettingRef.data();
                            var match = DataService.getMatchById(matchId);
                            if (!match.home_penalty && !match.away_penalty) {
                                var points = RuleService.getPoints({
                                    homeTeam: match.home_result,
                                    awayTeam: match.away_result,
                                    guessHome: betting.homeTeam,
                                    guessAway: betting.awayTeam
                                });
                            } else {
                                var points = RuleService.getPoints({
                                    homeTeam: match.home_penalty,
                                    awayTeam: match.away_penalty,
                                    guessHome: betting.homeTeam,
                                    guessAway: betting.awayTeam
                                });
                            }

                            users[userId].bettings[matchId] = betting;
                            if (points > 0) {
                                users[userId].points[points]++;
                                users[userId].points["sum"] += points;
                            }

                        });

                        $rootScope.safeApply(function () {
                        })
                    });

                });

            });
        });

    }
    init();

}]);