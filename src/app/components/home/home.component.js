var home = {
  templateUrl: 'app/components/home/home.html',
  controller: 'HomeController'
};
angular
  .module('components')
  .component('home', home)
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.home', {
       // parent: 'app',
        url: '/home',
        data: {
          requiredAuth: true
        },
        component: 'home'
      })
  });