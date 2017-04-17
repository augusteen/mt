angular.module('components')
    .factory('authInjector', ['', function() {
        var authInjector = {
            request: function(config) {
                // if (!SessionService.isAnonymus) {
                //     config.headers['x-session-token'] = SessionService.token;
                // }

                var headers = {
                    // "Content-Type": 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                };
                // if(config.url)
                config.headers = headers;
                return config;
            },
            response: function(response) {

                if (response.config.url.startsWith('my url')) {
                    // some treatment
                } else
                // other treatment
                    return response;
            }
        };
        return authInjector;
    }]);
