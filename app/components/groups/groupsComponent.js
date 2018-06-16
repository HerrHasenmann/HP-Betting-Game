app.component("groups", {
    templateUrl: "./components/groups/groupsTemplate.html",
    controller: ["$timeout", "DataService", GroupController]
});

function GroupController($timeout, DataService) {

    var ctrl = this;

    ctrl.groups = DataService.getGroups;

    ctrl.$onInit = function () {
        $timeout(function () {
            ctrl.isReady = true;
        }, 500);
    }
}