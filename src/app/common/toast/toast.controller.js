function ToastController($scope, $mdToast, $mdDialog) {

    $scope.closeToast = function() {
        $mdToast.hide();
    };
}

angular
    .module('common')
    .controller('ToastController', ["$scope", "$mdToast", "$mdDialog", ToastController]);