app.service("AuthenticationService", ["$firebaseAuth", "$firebaseObject", "$rootScope", function ($firebaseAuth, $firebaseObject, $rootScope) {

    var serv = this;

    var ready = false;
    var user = null;

    serv.isAuthenticated = function () {
        return !!user;
    };

    serv.isReady = function () {
        return ready;
    };

    serv.login = function (credentials) {
        return new Promise(function (resolve, reject) {
            $firebaseAuth().$signInWithEmailAndPassword(credentials.email, credentials.password).then(function (firebaseUser) {
                // user = firebaseUser;

                resolve(firebaseUser);
            }, function (error) {
                reject(error);
            })
        })
    };

    serv.logout = function () {
        return $firebaseAuth().$signOut();
    };

    serv.register = function (credentials) {

        return new Promise(function (resolve, reject) {
            $firebaseAuth().$createUserWithEmailAndPassword(credentials.email, credentials.password).then(function (firebaseUser) {

                //Set name of user
                firestore.doc("users/"+firebaseUser.user.uid).set({
                    name: credentials.name
                }).then(function () {
                    user.name = credentials.name;
                });

                resolve(firebaseUser);
            }, function (error) {
                reject(error);
            })
        })
    };

    serv.getUser = function () {
        return user;
    };

    function init() {
        $firebaseAuth().$onAuthStateChanged(function (firebaseUser) {
            user = firebaseUser;

            if (firebaseUser) {
                var userDataRef = firestore.doc("users/"+firebaseUser.uid);
                userDataRef.get().then(function (doc) {
                    $rootScope.safeApply(function () {
                        user.name = doc.data().name;
                    })
                });
            }

            ready = true;
        })
    }
    init()
}]);