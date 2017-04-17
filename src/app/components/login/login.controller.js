function LoginController($state, LoginService) {
    var ctrl = this;

    ctrl.submitForm = function() {
        console.log('clicked submit');

        console.log(ctrl.user);

        LoginService.authenticate(ctrl.user).then(function() {
            $state.go('app.home');
        });


    };

}

angular
    .module('components')
    .controller('LoginController', ['$state', 'LoginService', LoginController]);