angular.module("myapp")
.filter("uniqueDate", function () {
    return function (input, prop) {
        if (angular.isArray(input) && angular.isString(prop)) {
            var keys = [];
            var data = [];
            angular.forEach(input, function (item) {
                var key = item[prop];
                if (keys.indexOf(key) == -1) {
                    keys.push(key);
                    data.push(item);
                }
            })
            return data;
        }
        else
            return input;
    }
});