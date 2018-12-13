

angular.module("myapp")
.factory("loginSvc", function ($http) {
    return {
        signin: function (u, p) {
            return $http({
                url: "http://localhost:7117/Token",
                method: "POST",
                data: $.param({ grant_type: 'password', username: u, password: p }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        },
        register: function (e, p, cp) {
            return $http({
                url: "http://localhost:7117/api/Account/Register",
                method: "POST",
                data: {
                    Email: e,
                    Password: p,
                    ConfirmPassword: cp
                }
            });
        }
    }
});