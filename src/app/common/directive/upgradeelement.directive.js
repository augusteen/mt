angular.module('common')
    .directive('upgradeElement', function() {
        return {
            restrict: 'AC',
            link: function($scope, $element) {
                // console.log($element);
                // // componentHandler.upgradeAllRegistered();
                //   componentHandler.upgradeElement($element[0]);
                // $element.ready(function(){
                //      componentHandler.upgradeAllRegistered();
                // });
            }
        };
    });