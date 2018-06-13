app.component("groups", {
    templateUrl: "./components/groups/groupsTemplate.html",
    controller: ["DataService", GroupController]
});

function GroupController(DataService) {

    var ctrl = this;

    ctrl.groups = DataService.getGroups;
}