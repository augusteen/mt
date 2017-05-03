function HomeController($element, $scope, $api, $resource) {
    var self = this,
        chartData = [],
        LeaveData = $resource(APIURL + 'api/timcardleave', null, {
            query: { method: 'POST' }
        });
    self.getWeekNumber = getWeekNumber;
    self.startCase = startCase;
    //getLeave Data 
    $scope.getLeave = function() {
        LeaveData.query({
            week: getLastFourMonday() //['2017-04-24', '2017-04-17']
        }, function success(data) {
            //Calculate Mean with loadash
            _.forEach(data.task, function(task) {
                task.week.Sum = _.sumBy(_.values(task.week));
            });
            $scope.leaveTask = data.task;
            //sort week days function
            data.week.sort(function(left, right) {
                return moment.utc(left).diff(moment.utc(right));
            });
            //sort the array
            data.week.sort();
            data.week.push('Sum');
            $scope.leaveWeek = data.week;
        }, function error(err) {
            console.log(err);
        });
    }
    $scope.viewHome = function() {
        $api.resrc('api/timecardtask', {
            query: {
                method: 'POST'
            }
        }).query({ week: getLastFourMonday() }, success).$promise;
    }

    function success(data) {
        _.forEach(data.task, function(task) {
            task.week.Avg = _.meanBy(_.values(task.week));
        });
        $scope.timecard = data.task;
        data.week.push('Avg');
        $scope.week = data.week;
    }

    $scope.viewProject = function() {
        $api.resrc('api/timecardproject', {
            query: {
                method: 'POST'
            }
        }).query({ week: getLastFourMonday() }, getProject).$promise;
    }

    function getProject(data) {
        _.forEach(data.task, function(task) {
            task.week.Avg = _.meanBy(_.values(task.week));
            chartData.push({
                project: task.Name,
                week: _.round(task.week.Avg, 1)
            });
        });
        $scope.project = data.task;
        data.week.push('Avg');
        $scope.projectweek = data.week;

        AmCharts.makeChart('chartdiv', {
            'type': 'serial',
            'theme': 'light',
            'dataProvider': chartData,
            'categoryField': 'project',
            'categoryAxis': {
                'gridPosition': 'start'
            },
            'rotate': true,
            'graphs': [{
                'valueField': 'week',
                'title': 'Utilization',
                'type': 'column',
                'labelText': '[[value]]',
                'fillAlphas': 0.8,
                'fillColors': '#c5cae9'
            }]
        });
    }

    function getWeekNumber(d) {
        if (moment(d, 'YYYY-MM-DD', true).isValid()) {
            return 'W' + moment(d).isoWeek();
        } else {
            return d;
        }
    }

    function getMonday(d) {
        return moment(new Date()).startOf('isoWeek').format('YYYY-MM-DD');
    }

    function getLastFourMonday() {
        var arr = [],
            i;
        for (i = 1; i <= 5; i++) {
            arr.push(moment(getMonday()).subtract(7 * i, 'days').format('YYYY-MM-DD'));
        }
        return arr;
    }
    $scope.viewHome();
    $scope.viewProject();

    function startCase(name) {
        return _.startCase(name);
    }
    $scope.getLeave();
}

angular
    .module('components')
    .controller('HomeController', HomeController);