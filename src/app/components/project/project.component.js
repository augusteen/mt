var project = {
  templateUrl: 'app/components/project/project.html',
  controller: 'ProjectController'
};

angular
  .module('components')
  .component('project', project)
   .config(function ($stateProvider) {
    $stateProvider
      .state('app.project', {
       // parent: 'app',
        url: '/project',
        data: {
          requiredAuth: true
        },
        component: 'project'
      })
  });