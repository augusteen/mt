angular.module('common')
    .directive('startCase', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            link: {
                post: function($scope, $element) {
                    $timeout(function() {
                        var txt = $element.text();
                        $element.text(_.startCase(txt));
                    })
                }
            }
        };
    }]);