angular.module('common')
    .directive('menuClose', function() {
        return {
            restrict: 'AC',
            link: function($scope, $element) {
                $element.bind('click', function() {
                    var drawer = angular.element(document.querySelector('.mdl-layout__drawer'));
                    if(drawer) {
                        document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
                        drawer.toggleClass('is-visible');
                    }
                });
            }
        };
    });