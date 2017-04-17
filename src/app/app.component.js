var app = {
    templateUrl: 'app/app.html',
    controller: 'AppController'
};

angular
    .module('app')
    .component('app', app)
    .config(function($stateProvider) {
        $stateProvider
            .state('app', {
                // redirectTo: 'contacts',
                url: '/app',
                data: {
                    requiredAuth: true
                },
                component: 'app'
            })
    })
    .run(function($state) {
        $state.go('app.task');
    })
    .factory('APIService', function($http) {
        var myData;
        return {

            getData: function(url,jsondata) {
                token = localStorage.getItem('token');
                $http({
                        url: APIURL + url,
                        method: 'GET',
                        headers: {
                            "Content-Type": 'application/json',
                            Authorization: 'Bearer ' + token
                        }
                    }).success(function(data, status, config, headers) {
                        jsondata = data;
                    })
                    .error(function() { //handler errors here
                    });
            }
        };
    });
