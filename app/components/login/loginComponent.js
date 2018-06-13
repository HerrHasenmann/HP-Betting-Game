app.component("login", {
    templateUrl: "./components/login/loginTemplate.html",
    controller: ["$rootScope", "$mdToast", "$mdDialog", "$mdMedia", "AuthenticationService", LoginController]
});

function LoginController($rootScope, $mdToast, $mdDialog, $mdMedia, AuthenticationService) {

    var ctrl = this;

    ctrl.user = {
        "email": null,
        "password": null
    };

    ctrl.hint = function () {
        if(ctrl.selectedTabIndex === 0){
            return "Zur Teilnahme am Tippspiel musst du dich einloggen.";
        }else if(ctrl.selectedTabIndex === 1){
            return "Einloggen mit "+ctrl.user.email;
        }
    };

    ctrl.login = function () {
        AuthenticationService.login(ctrl.user).then(function () {
            $mdToast.show($mdToast.simple()
                .content("Du hast dich erfolgreich eingeloggt.")
                .position('bottom right'));
        }, function (error) {

            if(error.code === "auth/wrong-password"){
                ctrl.loginForm.password.$setValidity("wrongPassword", false);
                ctrl.user.password = null;

                ctrl.selectedTabIndex = 1;
            } else if (error.code === "auth/invalid-email") {
                ctrl.loginForm.email.$setValidity('notFound', true);
                ctrl.loginForm.email.$setValidity('emailInvalid', false);
                ctrl.user.password = null;

                ctrl.selectedTabIndex = 0;
            } else if (error.code === "auth/user-not-found") {
                ctrl.loginForm.email.$setValidity('emailInvalid', true);
                ctrl.loginForm.email.$setValidity('notFound', false);
                ctrl.user.password = null;

                ctrl.selectedTabIndex = 0
            }
        });
    };

    ctrl.registerDialog = function () {
        var dialogConfiguration = {
            controller: ["$mdDialog", DialogController],
            controllerAs: "$ctrl",
            templateUrl: './components/login/registerDialogTemplate.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            escapeToClose: true,
            fullscreen: $mdMedia("xs")
        };

        $mdDialog.show(dialogConfiguration)
            .then(function () {
                //On successful close

                $mdToast.show($mdToast.simple()
                    .content("Du hast dich erfolgreich registriert.")
                    .position('bottom right'));
            }, function () {
                //On cancel, do nothing
            });

        function DialogController($mdDialog) {

            var ctrl = this;

            ctrl.user = {
                "name": null,
                "email": null,
                "password": null,
                "passwordConfirmation": null
            };

            ctrl.isInvalid = function () {
                if(ctrl.registerForm.$invalid){
                    return true;
                } else if (!ctrl.user.name || !ctrl.user.email || !ctrl.user.password || !ctrl.user.passwordConfirmation){
                    return true;
                } else if (ctrl.user.password !== ctrl.user.passwordConfirmation) {
                    return true;
                }
            };

            ctrl.cancel = function () {
                $mdDialog.cancel();
            };

            ctrl.register = function () {

                AuthenticationService.register(ctrl.user).then(function () {
                    $mdDialog.hide();
                }, function (error) {

                    $rootScope.safeApply(function () {
                        if (error.code === "auth/invalid-email") {
                            ctrl.registerForm.email.$setValidity('emailInvalid', false);
                        }
                    });
                });
            };

            ctrl.checkIfNameExists = function () {
                firestore.collection("users").where("name", "==", ctrl.user.name).get().then(function (data) {
                    $rootScope.safeApply(function () {
                        if(!data.empty){
                            ctrl.registerForm.name.$setValidity('nameExists', false);
                        }else{
                            ctrl.registerForm.name.$setValidity('nameExists', true);
                        }
                    });
                })
            };

            ctrl.checkEquality = function () {
                if(ctrl.user.password !== ctrl.user.passwordConfirmation) {
                    ctrl.registerForm.passwordConfirmation.$setValidity('notEqual', false);
                }else{
                    ctrl.registerForm.passwordConfirmation.$setValidity('notEqual', true);
                }
            }
        }
    };
}