function TaskController($scope, $api, $mdToast, $mdDialog, LoginService, Upload) {

    var root = $scope.$root,
        durl = 'https://saintgobain.service-now.com/time_card_list.do?&CSV&sysparm_query=week_starts_on>=';
    $scope.orig = angular.copy($scope.user);
    $scope.viewTask = false;
    $scope.selected = [];
    $scope.editMode = false;
    $scope.projects = [];
    $scope.users = [];
    $scope.task = {};
    $scope.durl = '';
    $scope.task.WEEKNO = weekOfYear(new Date());
    $scope.weeks = 52;
    $scope.uploadedData = [];
    $scope.todaysDate = new Date();
    var originatorEv;

    $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
    $scope.datechange = function() {

        $scope.durl = durl + moment($scope.todaysDate).format('YYYY-MM-DD');
        console.log($scope.durl);
        // console.log(moment(date).format('YYYY-MM-DD'));
    }
    $scope.onlyMonday = function(date) {
        var day = date.getDay();

        return day == 1;
    }

    $scope.uploadFile = function($files) {
        // console.log('uploading');
        Upload.upload({
            url: APIURL + 'api/timecardupload',
            file: $files[0],
            // headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then(function(resp) {
            // file is uploaded successfully
            // console.log(status);
            $scope.uploadedData = resp.data;
            $scope.showToast();
        }, function(resp) {
            console.log(resp);
        }, function(evt) {
            console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :' + evt.config.data.file.name);
        });
    }

    $scope.showToast = function() {
        $mdToast.show({
            hideDelay: 3000,
            position: 'top right',
            // controller: 'ToastController',
            templateUrl: 'app/common/toast/toast.html'
        });
    };
    $scope.getWeeks = function(num) {
        return new Array(num);
    }
    $scope.inLineEdit = function(event, item) {
        event.stopPropagation();
        var holder = [];
        if (item) {
            holder.push(item);
        } else {
            holder = $scope.selected;
        }
        $mdDialog.show({
            clickOutsideToClose: true,
            // controller: 'EditCtrl',
            // controllerAs: 'vm',
            focusOnOpen: false,
            targetEvent: event,
            locals: {
                items: holder
            },
            // templateUrl: 'app/........dialog.html'
        }).then();
    };
    $scope.delete = function() {
        // console.log($scope.selected);
        // $pgbar.setVisible(true);
        root.$pgVisible(true);
        angular.forEach($scope.selected, function(item) {

            console.log(item);
            var deletes = {};
            deletes.tskid = item.TSKID;
            $api.taskupdate.remove(deletes, saveSuccess);
        });


    }
    $scope.edit = function() {
        console.log($scope.selected);
        $scope.task = $scope.selected[0];
        $scope.editMode = true;
        $scope.viewTask = true;
    }

    function success(users) {
        $scope.users = users;
    }

    $scope.addTask = function() {


        $scope.taskDetails.$setSubmitted()


        if ($scope.taskDetails.$valid) {
            // $pgbar.setVisible(true);
            $scope.task.SGID = LoginService.getUser().lastname + '' + LoginService.getUser().firstname.toUpperCase();
            root.$pgVisible(true);
            if (!$scope.editMode)
                $api.task.save($scope.task, saveSuccess);
            else {
                //var sgid = $scope.user.SGID;
                //var query = {}
                $api.taskupdate.update($scope.task, saveSuccess);
            }
        }

    }

    $scope.getProject = function() {
        $scope.promise = $api.projectcode.query('', successProject).$promise;
    };

    function successProject(projects) {
        $scope.projects = projects;
    }

    function success(tasks) {
        $scope.tasks = tasks;
    }
    $scope.getTask = function() {
        var tsk = {};
        if (!$scope.filter) {
            tsk.name = LoginService.getUser().lastname + ' ' + LoginService.getUser().firstname.toUpperCase();
        } else {
            tsk.name = $scope.filter.User;
        }
        if ($scope.filterDate) {
            tsk.date = moment($scope.filterDate).format('YYYY-MM-DD');
        }
        $scope.promise = $api.taskfetch.query(tsk, success).$promise;
    };

    function saveSuccess(data) {
        console.log(data);
        // $pgbar.setVisible(false);
        root.$pgVisible(false)
        if (data.status) {

            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#root')))
                .clickOutsideToClose(true)
                .title('Add or Edit Task')
                .textContent('The task has been added or edited sucessfully')
                .ariaLabel('Add or Edit')
                .ok('Ok')
            );

            $scope.viewTask = false;
            $scope.task = angular.copy($scope.orig);
            $scope.taskDetails.$setPristine();
            $scope.selected = [];
            $scope.getTask();
        }
    }

    function weekOfYear(date) {
        var d = new Date(+date);
        d.setHours(0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
    }

    $scope.getUser = function() {
        $scope.promise = $api.user.query('', successUser).$promise;
    };

    function successUser(users) {
        $scope.users = users;
    }

    function success(tasks) {
        $scope.tasks = tasks;
    }
    $scope.getProject();
    $scope.getTask();
    $scope.getUser();
}

angular
    .module('components')
    .controller('TaskController', TaskController);