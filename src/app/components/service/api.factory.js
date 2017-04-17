angular.module('components')
    .factory('$api', ['$resource', function($resource) {

        var headers = {
                "Content-Type": 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            userConfig = {
                query: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        sgid: '@SGID'
                    },
                    interceptor: 'authInjector'
                },
                save: {
                    method: 'POST'
                }
            },
            userUpdate = {
                update: {
                    method: 'PUT',
                    params: {
                        sgid: '@SGID'
                    }
                },
                remove: {
                    method: 'DELETE',
                    params: {
                        sgid: '@SGID'
                    }
                }
            },
            projectUpdate = {
                update: {
                    method: 'PUT',
                    params: {
                        prid: '@PRID'
                    }
                },
                remove: {
                    method: 'DELETE',
                    params: {
                        prid: '@PRID'
                    }
                }
            },
            taskUpdate = {
                update: {
                    method: 'PUT',
                    params: {
                        tskid: '@TSKID'
                    }
                },
                remove: {
                    method: 'DELETE',
                    params: {
                        tskid: '@TSKID'
                    }
                }
            },
            taskFetch = {
                query: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        name: '@name',
                        date: '@date'
                    }
                },
                save: {
                    method: 'POST'
                }
            }
            // userConfig.query.headers = headers;
            // userConfig.save.headers = headers;
            // userUpdate.update.headers = headers;
            // userUpdate.remove.headers = headers;
            // projectUpdate.update.headers = headers;
            // projectUpdate.remove.headers = headers;
            // taskUpdate.update.headers = headers;
            // taskUpdate.remove.headers = headers;
        return {
            resrc: function(url,config){
                return $resource(APIURL+url,null,config);
            },
            user: $resource(APIURL + 'api/user', null, userConfig),
            userupdate: $resource(APIURL + 'api/user/:sgid', null, userUpdate),
            project: $resource(APIURL + 'api/project', null, userConfig),
            projectcode: $resource(APIURL + 'api/projectcode', null, userConfig),
            projectupdate: $resource(APIURL + 'api/project/:prid', null, projectUpdate),
            task: $resource(APIURL + 'api/task', null, userConfig),
            taskfetch: $resource(APIURL + 'api/task/:name/:date', null, taskFetch),
            taskupdate: $resource(APIURL + 'api/task/:tskid', null, taskUpdate),
            servicenow: $resource('https://saintgobain.service-now.com/api/now/table/sys_user', null, {
                headers: {
                    Accept: 'application/json'
                },
                fetch: {
                    method: 'GET',
                    params: {
                        user_name: '@SGID'
                    }
                }
            })
        }
    }]);
