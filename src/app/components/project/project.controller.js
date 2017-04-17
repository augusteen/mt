function ProjectController($scope, $api, $mdDialog,Upload) {
    // var ctrl = this;
    var root = $scope.$root;

    $scope.orig = angular.copy($scope.project);
    $scope.viewProject = false;
    $scope.selected = [];
    $scope.editMode = false;

    $scope.delete = function() {
        // console.log($scope.selected);
        // $pgbar.setVisible(true);
        root.$pgVisible(true);
        angular.forEach($scope.selected, function(item) {

            console.log(item);
            var deletes = {};
            deletes.prid = item.PRID;
            $api.projectupdate.remove(deletes, saveSuccess);
        });
    }

    $scope.uploadFile = function($files) {
        Upload.upload({
            url: APIURL + 'api/projectupload',
            file: $files[0],
            // headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).progress(function(e) {}).then(function(data, status, headers, config) {
            // file is uploaded successfully
            console.log(data);
            $scope.uploadedData = data.data;

        });
    }
    $scope.edit = function() {
        console.log($scope.selected);
        $scope.project = $scope.selected[0];
        $scope.editMode = true;
        $scope.viewProject = true;
    }

    function success(project) {
        $scope.projects = project;
    }

    $scope.addProject = function() {


        $scope.projectDetails.$setSubmitted()


        if ($scope.projectDetails.$valid) {
            // $pgbar.setVisible(true);
            root.$pgVisible(true);
            if (!$scope.editMode)
                $api.project.save($scope.project, saveSuccess);
            else {
                //var sgid = $scope.user.SGID;
                //var query = {}
                $api.projectupdate.update($scope.project, saveSuccess);
            }
        }

    }
    $scope.getProject = function() {
        $scope.promise = $api.project.query('', success).$promise;
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
                .title('Add or Edit User')
                .textContent('The user has been added or edited sucessfully')
                .ariaLabel('Add or Edit')
                .ok('Ok')
            );

            $scope.viewProject = false;
            $scope.editMode = false;
            $scope.project = angular.copy($scope.orig);
            $scope.projectDetails.$setPristine();
            $scope.selected = [];
            $scope.getProject();
        }
    }
    $scope.getProject();
}

angular
    .module('components')
    .controller('ProjectController', ProjectController);
