function LoginService($rootScope, $state, $http, $q) {

    // this.request = function(){
    //  console.log($http);
    // }
    // var user;

    return ({
        authenticate: authenticate,
        hasToken: hasToken,
        getUser: getUser,
        getUserName: getUserName,
        removeToken: removeToken
    });

    function authenticate(formdata) {

        var request = $http({
            method: "post",
            url: APIURL + './authenticate', //"http://localhost:3000/authenticate",
            data: {
                username: formdata.sgid,
                password: formdata.password
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function handleSuccess(response) {

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return (response.data);
    }


    function handleError(response) {
        console.log(response);
    }

    function hasToken() {

        // var token = localStorage.getItem('token');
        return localStorage.getItem('token') != null;
    }

    function getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    function getUserName() {
        var user = getUser();
        return user.lastname.toLowerCase() + ', ' + user.firstname.toLowerCase();
    }

    function removeToken() {
        localStorage.removeItem('token');
    }
}


angular
    .module('components')
    .service('LoginService', ['$rootScope', '$state', '$http', '$q', LoginService]);