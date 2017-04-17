var user = {
  templateUrl: 'app/components/user/user.html',
  controller: 'UserController'
};

angular
  .module('components')
  .component('user', user)
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.user', {
       // parent: 'app',
        url: '/user',
        data: {
          requiredAuth: true
        },
        component: 'user'
      })
  });