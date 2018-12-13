angular.module("myapp").factory("remoteCallSvc", function ($http) {
    return {
        get: function (url,header,data) {
            return $http({
                url: url,
                method:"Get",
                headers:header,
                params:data
            })
        },
        post: function (url, header, data) {
            return $http({
                url: url,
                method: "Post",
                headers: header,
                data: data
            })
        },
        put: function (url, header, data) {
            return $http({
                url: url,
                method: "Put",
                headers: header,
                params: data
            })
        },
        remove: function (url, header, data) {
            return $http({
                url: url,
                method: "Delete",
                headers: header,
                params: data
            })
        },
    }
   
})