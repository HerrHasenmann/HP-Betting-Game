app.service("DataService", ["$http", function ($http) {

    var serv = this;

    var data = null;
    var nextMatches = null;
    var previousMatches = null;
    var matchesByDate = {};
    var matchesById = {};

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
        return nextMatches;
    };

    serv.getPreviousMatches = function () {
        return previousMatches;
    };

    serv.getTeam = function (id) {
        return data.teams.filter(function (team) { return team.id === id })[0];
    };

    serv.getGroups = function () {
        if (data) {
            return data.groups;
        }
    };
    
    serv.getKnockoutMatches = function (round) {
        if(data) {
            return data.knockout[round].matches
        }
    };

    serv.getMatches = function () {
        return matchesById
    };

    serv.getMatchById = function (id) {
        return matchesById[id];
    };

    function sortMatches(data) {
        var groups = data.groups;
        var knockouts = data.knockout;

        angular.forEach(groups, function (group, key) {
            angular.forEach(group.matches, function (match, index) {

                var date = moment(match.date).local().format();
                match.group = key;

                if(matchesByDate.hasOwnProperty(date)){
                    matchesByDate[date].push(match);
                }else{
                    matchesByDate[date] = [match];
                }

                matchesById[match.name] = match;
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

                matchesById[match.name] = match;
            })
        });

    }

    function findNextMatches() {

        if(!matchesByDate){
            matchesByDate = sortMatches(data);
        }

        var nextMatches = null;
        var diffNextMatches = null;
        var currentMoment = moment();


        angular.forEach(matchesByDate, function (matches, date) {

            var diffToMatches = moment(date).diff(currentMoment);


            if( (diffNextMatches === null && diffToMatches > 0) || (diffToMatches > 0 && diffToMatches < diffNextMatches)){
                nextMatches = matches;
                diffNextMatches = diffToMatches;
            }

        });

        return nextMatches;
    }

    function findPreviousMatches() {

        if(!matchesByDate){
            matchesByDate = sortMatches(data);
        }

        var previousMatches = null;
        var diffPreviousMatches = null;
        var currentMoment = moment();


        angular.forEach(matchesByDate, function (matches, date) {

            var diffToMatches = moment(date).diff(currentMoment);


            if( (diffPreviousMatches === null && diffToMatches < 0) || (diffToMatches < 0 && diffToMatches > diffPreviousMatches)){
                previousMatches = matches;
                diffPreviousMatches = diffToMatches;
            }

        });

        return previousMatches;
    }

    function init() {

        return new Promise(function (resolve, reject) {
            var config = {
                url: "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json",
                method: "GET"
            };

            $http(config).then(function (response) {
                data = response.data;
                console.log(data);

                sortMatches(data);
                nextMatches = findNextMatches();
                previousMatches = findPreviousMatches();

                resolve(data);
            }, function () {
                console.error("Could not fetch data");
                reject();
            })
        });

    }

    init();
}]);