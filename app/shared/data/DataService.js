app.service("DataService", ["$http", function ($http) {

    var serv = this;

    var data = null;
    var nextMatches = null;

    serv.getData = function () {

        return new Promise(function (resolve, reject) {
            if (data) {
                resolve(data)
            } else {
                init().then(function () {
                    resolve(data);
                }, function () {
                    reject();
                })
            }
        });
    };

    serv.getNextMatches = function () {

        if(nextMatches){
            return nextMatches;
        } else {
            if(data){
                nextMatches = findNextMatch();
            } else {
                return null;
            }
        }
    };

    serv.getTeam = function (id) {
        return data.teams.filter(function (team) { return team.id === id })[0];
    };

    serv.getGroups = function () {
        return data.groups;
    };

    function findNextMatch() {

        var groups = data.groups;
        var knockouts = data.knockout;

        var matchesByDate = {};

        angular.forEach(groups, function (group, key) {
            angular.forEach(group.matches, function (match, index) {
                var date = moment(match.date).local().format();
                match.group = key;
                if(matchesByDate.hasOwnProperty(date)){
                    matchesByDate[date].push(match);
                }else{
                    matchesByDate[date] = [match];
                }
            })
        });

        angular.forEach(knockouts, function (knockout, key) {
            angular.forEach(knockout.matches, function (match, index) {
                var date = moment(match.date).local().format();
                match.knockout = key;
                if(matchesByDate.hasOwnProperty(date)){
                    matchesByDate[date].push(match);
                }else{
                    matchesByDate[date] = [match];
                }
            })
        });

        var nextMatches = null;
        var diffNextMatches = null;
        var currentMoment = moment();

        angular.forEach(matchesByDate, function (matches, date) {

            var diffToMatches = moment(date).diff(currentMoment);

            if(!diffNextMatches || (diffToMatches > 0 && diffToMatches < diffNextMatches)){
                nextMatches = matches;
                diffNextMatches = diffToMatches;
            }

        });

        return nextMatches;
    }

    function init() {

        return new Promise(function (resolve, reject) {
            var config = {
                url: "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json",
                method: "GET"
            };

            $http(config).then(function (response) {
                data = response.data;
                resolve(data);
            }, function () {
                console.error("Could not fetch data");
                reject();
            })
        });

    }

    init();
}]);