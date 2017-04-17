function sideController($state, LoginService,$mdSidenav) {

    var ctrl = this;
    if (LoginService.getUser().role = 'Admin') {
        ctrl.list = SD_ADMIN;
    }

    switch (LoginService.getUser().role) {
        case 'Admin':
            ctrl.list = SD_ADMIN;
            break;
        case 'User':
            ctrl.list = SD_USER;
            break;
    }
    ctrl.logout = function() {
        LoginService.removeToken();
        $state.go('login');
    }

    ctrl.hideSidnav = function(){
        $mdSidenav('left').toggle();
    }
}

angular.module('common')
    .controller('SidebarController', sideController);
