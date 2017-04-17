var sidebar = {
	bindings:{
		firstname : '<',
		lastname : '<'
	},
  templateUrl: 'app/common/sidebar.html',
  controller: 'SidebarController'
};

angular
  .module('common')
  .component('appSidebar', sidebar);
  