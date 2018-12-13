angular.module("myapp")
.factory("authStore", function () {
    return {
        save: function (user, annoy) {
            sessionStorage.setItem("auth", JSON.stringify({ username: user, accesstoken: annoy, authenticated: true }));
        },
        get: function () {
            if (sessionStorage.length > 0) {
                return sessionStorage.getItem("auth") == null ? { authenticated: false } : JSON.parse(sessionStorage.getItem("auth"));

            }
            else {
                return { authenticated: false };

            }
        }, remove: function () {
            sessionStorage.removeItem("auth");
        }
    }
});