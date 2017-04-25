function HomeController($scope, $api, $resource) {

    var LeaveData = $resource(APIURL + 'api/timcardleave', null, {
        query: { method: 'POST' }
    });

    $scope.getLeave = function() {
        LeaveData.query({
            week: ['2017-04-24', '2017-04-17']
        }, function success(data) {
            $scope.leave = data;
        }, function error(err) {
            console.log(err);
        });
    }
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

    $scope.getWeekNumber = function(d) {
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
        return 'W' + weekNo;
    }

    $scope.viewHome();
    $scope.viewProject();

    var chartData = [{
        "country": "USA",
        "visits": 4252
    }, {
        "country": "China",
        "visits": 1882
    }, {
        "country": "Japan",
        "visits": 1809
    }, {
        "country": "Germany",
        "visits": 1322
    }, {
        "country": "UK",
        "visits": 1122
    }, {
        "country": "France",
        "visits": 1114
    }, {
        "country": "India",
        "visits": 984
    }, {
        "country": "Spain",
        "visits": 711
    }, {
        "country": "Netherlands",
        "visits": 665
    }, {
        "country": "Russia",
        "visits": 580
    }, {
        "country": "South Korea",
        "visits": 443
    }, {
        "country": "Canada",
        "visits": 441
    }, {
        "country": "Brazil",
        "visits": 395
    }, {
        "country": "Italy",
        "visits": 386
    }, {
        "country": "Australia",
        "visits": 384
    }, {
        "country": "Taiwan",
        "visits": 338
    }, {
        "country": "Poland",
        "visits": 328
    }];

    AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "dataProvider": chartData,
        "categoryField": "country",
        "graphs": [{
            "valueField": "visits",
            "type": "column"
        }]
    });
    $scope.getLeave();
}

angular
    .module('components')
    .controller('HomeController', HomeController);