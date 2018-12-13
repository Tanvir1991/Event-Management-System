angular.module("myapp")
.controller("adminCtrl", function ($scope, authStore, loginSvc, $location) {
    $scope.loginError = "";
    $scope.loginModel = {};
    $scope.model = {};


    $scope.pageSize = 5;
    $scope.currentPage = 0;
    $scope.Products = [];

    $scope.pageCount = function () {
        return Math.ceil($scope.Products.length / $scope.pageSize) - 1;
    }
    $scope.rangeSize = function () {
        var range = 14;
        var start = $scope.currentPage;
        var lst = [];

        var totalPage = $scope.pageCount();
        if (start > (totalPage - range)) {
            start = (totalPage - range) + 15;
        }
        console.log(start > ($scope.pageCount() - range))
        for (var i = start; i < (start + range) ; i++) {
            lst.push(i);

        }
        return lst;
    }
    console.log("Data : " + $scope.Products.length);
    console.log(" Page: " + $scope.pageSize)
    console.log($scope.pageCount())
    $scope.setPage = function (m) {
        $scope.currentPage = m;
    }

    $scope.nextPage = function () {
        if ($scope.currentPage > $scope.pageCount())
            $scope.currentPage++;
    }
    $scope.nextPageDisable = function () {
        //return $scope.currentPage == $scope.pageCount() ? "disabled" : "";
        return $scope.currentPage == 14 ? "disabled" : "";
    }
    $scope.prePage = function () {
        if ($scope.currentPage > 0)
            $scope.currentPage--;
    }
    $scope.prePageDisable = function () {
        return $scope.currentPage == 0 ? "disabled" : "";

    }


    $scope.auth = authStore.get();
    // console.log($scope.auth);
    if ($scope.auth.authenticated)
        $location.path("/productview");
    $scope.showLoginForm = function () {
        $("#loginModal").modal("show");
    };
   
    $scope.signin = function () {
       
        loginSvc.signin($scope.loginModel.username, $scope.loginModel.password)
            .then(function (result) {

                authStore.save(result.data.userName, result.data.access_token);
                $scope.auth = authStore.get();
                $scope.loginModel = null;
                $scope.loginError = "";
                $("#loginModal").modal("hide");
                $location.path("/home");
                console.log(  result.data.access_token );
                //$window.location.href = "/app/admin/views/products.html";
            }, function (respose) {
                console.log(respose);
                $scope.loginError = respose.data.error_description;
            });
    };
    $scope.signout = function () {
        authStore.remove();
        $scope.auth = {};
        $location.path("/login");
    };

});
app.filter("pagination", function () {
    return function (input, start) {
        return input.slice(start, 70)
    }
})

