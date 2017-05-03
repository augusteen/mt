function UserController($scope, $api, $mdDialog) {
    // var ctrl = this;

    var root = $scope.$root;
    $scope.orig = angular.copy($scope.user);
    $scope.viewUser = false;
    $scope.selected = [];
    $scope.editMode = false;


    $scope.delete = function() {
        // console.log($scope.selected);
        // $pgbar.setVisible(true);
        root.$pgVisible(true);
        angular.forEach($scope.selected, function(item) {

            console.log(item);
            var deletes = {};
            deletes.sgid = item.SGID;
            $api.userupdate.remove(deletes, saveSuccess);
        });


    }
    $scope.edit = function() {
        console.log($scope.selected);
        $scope.user = $scope.selected[0];
        $scope.editMode = true;
        $scope.viewUser = true;
    }

    function success(users) {
        $scope.users = users;
    }

    $scope.addUser = function() {


        $scope.userDetails.$setSubmitted()

        // $scope.fetchsnid();
        if ($scope.userDetails.$valid) {
            // $pgbar.setVisible(true);
            root.$pgVisible(true);
            if (!$scope.editMode)
                $api.user.save($scope.user, saveSuccess);
            else {
                //var sgid = $scope.user.SGID;
                //var query = {}
                $api.userupdate.update($scope.user, saveSuccess);
            }
        }

    }

    // function snowsuccess(data) {
    //     console.log(data);
    // }
    // $scope.fetchsnid = function(){
    //     $api.servicenow.fetch($scope.user.SGID,snowsuccess);
    // }
    $scope.getUser = function() {
        $scope.promise = $api.user.query('', success).$promise;
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

            $scope.viewUser = false;
            $scope.editMode = false;
            $scope.user = angular.copy($scope.orig);
            $scope.userDetails.$setPristine();
            $scope.selected = [];
            $scope.getUser();
        }
    }
    $scope.getUser();
}

angular
    .module('components')
    .controller('UserController', UserController);