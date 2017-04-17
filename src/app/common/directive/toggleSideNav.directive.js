angular.module('common')
    .directive('toggleSidenav', function ($mdSidenav) {
        return {
            restrict: 'AC',
            link: function($scope, $element) {
                $element.bind('click', function() {
                    $mdSidenav('left').toggle();
                });
            }
        };
    });