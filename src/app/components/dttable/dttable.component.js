var dttable = {
  bindings: {
    json: '<'
  },
  templateUrl: 'app/components/dttable/dttable.html',
  controller: 'tableController'
};

angular
  .module('components')
  .component('dttable', dttable);
