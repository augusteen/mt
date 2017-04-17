function HomeController($scope, $api) {

    $scope.viewHome = function() {
        $api.resrc('api/timecardtask', {
            query: {
                method: 'GET',
                params: {
                    name: '@name',
                    date: '@date'
                }
            }
        }).query('', success).$promise;
    }

    function success(data) {
        $scope.timecard = data.task;
        $scope.week = data.week;
    }

    $scope.viewProject = function() {
        $api.resrc('api/timecardproject', {
            query: {
                method: 'GET'
            }
        }).query('', getProject).$promise;
    }

    function getProject(data) {
        $scope.project = data.task;
        $scope.projectweek = data.week;
    }
 
    $scope.getWeekNumber =function(d) {
        // Copy date so don't modify original
        d = new Date(d);
        d = new Date(+d);
        d.setHours(0, 0, 0, 0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(), 0, 1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        // Return array of year and week number
        return  'W'+ weekNo;
    }

    $scope.viewHome();
    $scope.viewProject();
}

angular
    .module('components')
    .controller('HomeController', HomeController);
