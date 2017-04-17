 angular.module('app')
     .factory('$pgbar', function() {
         return {

             setVisible: function(value) {
                 var pg = document.getElementById('progressBar');
                 if (value) {
                     pg.classList.remove('pgbar');
                 } else {
                     pg.classList.add('pgbar');
                 }
             }
         };
     });
