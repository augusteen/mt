function HomeController($element, $scope, $api, $resource) {
    var self = this,
        chartData = [],
        chart,
        chartBase64,
        LeaveData = $resource(APIURL + 'api/timcardleave', null, {
            query: { method: 'POST' }
        });
    //Public functions
    self.getWeekNumber = getWeekNumber;
    self.startCase = startCase;
    self.exportPdf = exportPdf;

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

        chart = AmCharts.makeChart('chartdiv', {
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
            }],
            'export': {
                'enabled': true,
                'menu': []
            }
        });

    }

    function exportPdf() {
        var doc = new jsPDF('p', 'pt'),
            table1 = getColumnRows($scope.project, $scope.projectweek, true),
            table2 = getColumnRows($scope.timecard, $scope.week, true),
            table3 = getColumnRows($scope.leaveTask, $scope.leaveWeek);

        doc.autoTable(table1.column, table1.row, {
            margin: { top: 60 },
            addPageContent: function(data) {
                doc.text('Project Report', 40, 30);
            }
        });
        chartImage();

        doc.autoTable(table2.column, table2.row, {
            margin: { top: 60 },
            startY: doc.autoTable.previous.finalY + 10,
            pageBreak: 'avoid'
        });
        doc.autoTable(table3.column, table3.row, {
            margin: { top: 60 },
            startY: doc.autoTable.previous.finalY + 10,
            pageBreak: 'avoid'
        });

        doc.save('Project_Report.pdf');

        refresh();
    }

    function chartImage() {
        chart.export.capture({}, function() {
            this.toPNG({}, function(base64) {
                // We have now a Base64-encoded image data
                // which we can now transfer to server via AJAX
                // i.e. jQuery.post( "saveimage.php", { "data": base64 } )
                chartBase64 = base64;
            });
        });

    }

    function getColumnRows(row, col, percent) {
        var columns = [],
            rows = [];
        _.forEach(row, function(task) {
            _.forOwn(task.week, function(value, key) {
                if (percent) {
                    task.week[key] = _.round(value, 0) + '%';
                } else {
                    task.week[key] = value;
                }
            });
            task.week.Name = _.startCase(task.Name);
            rows.push(task.week);
        });
        columns.push({ title: 'Name', dataKey: 'Name' });
        _.forEach(col, function(date) {
            columns.push({
                title: getWeekNumber(date),
                dataKey: date
            });
        });

        return { column: columns, row: rows };
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

    function startCase(name) {
        return _.startCase(name);
    }

    function refresh() {
        chartData = [];
        $scope.viewHome();
        $scope.viewProject();
        $scope.getLeave();
    }
    refresh();
}

angular
    .module('components')
    .controller('HomeController', HomeController);