'use strict';
/**
 * @module cookbook
 */
// Declare app level module which depends on views, and components

/**
 * @module myApp
 * @requires cookbook
 * @requires ngMaterial
 * @requires ngAnimates
 */

angular.module('app', [
    'ui.router',
    'ngResource',
    'ngAnimate',
    'ngMaterial',
    'common',
    'components',
    'ngMessages'
]).run(function($transitions, $state, LoginService, $rootScope) {
    $transitions.onStart({
        to: function(state) {
            return !!(state.data && state.data.requiredAuth && !LoginService.hasToken());
        }
    }, function() {
        return $state.target('login');
    });
    $transitions.onStart({
        to: 'login'
    }, function() {
        if (LoginService.hasToken()) {
            return $state.target('app.user');
        }
    });

    // $transitions.onStart({}, function() {
    //     return $state.target('login');
    // });
    // 

    $rootScope.$pgVisible = function(value) {
        var pg = document.getElementById('progressBar');
        if (value) {
            pg.classList.remove('pgbar');
        } else {
            pg.classList.add('pgbar');
        }
    }
}).config(['$httpProvider', '$mdDateLocaleProvider', function($httpProvider, $mdDateLocaleProvider) {
    $httpProvider.interceptors.push(function() {
        return {
            request: function(config) {
                var headers = {
                    "Content-Type": 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                };
                if (/upload/g.test(config.url))
                    delete headers["Content-Type"];
                config.headers = headers;
                return config;
            },
            response: function(response) {

                return response;
            },
            responseError: function(response) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    // $state.go('login');
                }
                return response;
            }

        }
    });
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD-MM-YYYY');
    };

}]);