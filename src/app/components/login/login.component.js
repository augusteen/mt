var loginForm = {
    bindings: {
        user: '<',
        // password: '<',
        //   message: '@',
        onSubmit: '&'
    },
    templateUrl: 'app/components/login/login.html',
    controller: 'LoginController'
}

angular
    .module('components')
    .component('loginForm', loginForm)
    .config(function($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                component: 'loginForm'
            });
        // $urlRouterProvider.otherwise('/login');
    });
