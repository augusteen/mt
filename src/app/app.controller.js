function AppController(LoginService, $state) {
    var ctrl = this;
    ctrl.firstname = LoginService.getUser().firstname;
    ctrl.lastname = LoginService.getUser().lastname;
    ctrl.logout = function() {
        LoginService.logout().then(function() {
            $state.go('auth.login');
        });
    };
    ctrl.test = function() {

    }
    ctrl.$postLink = function() {
        // window.componentHandler.upgradeAllRegistered();
    };

    ctrl.update = function() {
        // window.componentHandler.upgradeAllRegistered();
    }
}

angular
    .module('app')
    .controller('AppController', AppController);