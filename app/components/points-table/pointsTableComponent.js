app.component("pointsTable", {
    templateUrl: "./components/points-table/pointsTableTemplate.html",
    controller: ["$filter", "UserService", PointsTableController]
});

function PointsTableController($filter, UserService) {

    var ctrl = this;

    ctrl.users = function () {
        var usersObject = UserService.getUsers();
        if (usersObject) {
            var userArray = $filter("toArray")(usersObject);

            userArray = userArray.sort(function (user1, user2) {
                return user2.points.sum - user1.points.sum
            });

            angular.forEach(userArray, function (user, index) {
                user.position = index + 1;
            });

            return userArray;
        }
    };

    ctrl.query = {
        order: null
    };
}