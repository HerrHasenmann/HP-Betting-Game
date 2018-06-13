app.component("underConstruction", {
    templateUrl: "./components/under-construction/underConstructionTemplate.html",
    controller: ["$rootScope", "AuthenticationService", UnderConstructionController]
});

function UnderConstructionController($rootScope, AuthenticationService) {

    var ctrl = this;

    ctrl.donateCarrot = function () {
        var user = AuthenticationService.getUser();
        var matchBettingRef = firestore.doc("users/"+user.uid+"/donations/carrot");

        matchBettingRef.set({
            isCarrotDonator: true
        }, { merge: true })
    };

    ctrl.$onInit = function () {

        var user = AuthenticationService.getUser();
        var matchBettingRef = firestore.doc("users/"+user.uid+"/donations/carrot");
        matchBettingRef.get().then(function (doc) {
            if (doc.exists) {
                refreshDonation(doc.data())
            }
            matchBettingRef.onSnapshot(function (doc) {
                if (doc.exists) {
                    refreshDonation(doc.data())
                }
            })

            $rootScope.safeApply(function () {
                ctrl.isReady = true;
            })
        });
    };

    function refreshDonation(donation) {
        $rootScope.safeApply(function () {
            if(donation.isCarrotDonator){
                ctrl.isCarrotDonator = donation.isCarrotDonator;
            } else {
                ctrl.isCarrotDonator = false;
            }
        })
    }
}