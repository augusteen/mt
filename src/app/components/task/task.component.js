var task = {
  templateUrl: 'app/components/task/task.html',
  controller: 'TaskController'
};

angular
  .module('components')
  .component('task', task)
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.task', {
       // parent: 'app',
        url: '/task',
        data: {
          requiredAuth: true
        },
        component: 'task'
      })
  });