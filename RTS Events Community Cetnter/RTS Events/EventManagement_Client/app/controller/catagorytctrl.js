angular.module("myapp").controller("ctctrl", function ($scope, remoteCallSvc, $location) {

    if ($scope.auth.authenticated)
    { $scope.model.error = ''; }
    else
    {
        $location.path("/login");
    }

    $scope.Catagories = [];
    load();
    $scope.addflower = null;
    
    $scope.showCtgForm = function () {
        $("#CtgModal").modal("show");
    };




    function load() {

        remoteCallSvc.get("http://localhost:7117/odata/Catagories", null, null)
            .then(function (result) {
                $scope.Catagories = result.data.value;
            })
    }

    $scope.save = function () {
        remoteCallSvc.post("http://localhost:7117/odata/Catagories", { "Authorization": "Bearer " + $scope.auth.accesstoken }, $scope.model.citem)
            .then(function () {
                $("#CtgModal").modal("hide");
                load();
                $scope.model.citem = null;
            })
    }


    $scope.delete = function (m) {
        remoteCallSvc.remove("http://localhost:7117/odata/Catagories(" + m + ")", { "Authorization": "Bearer " + $scope.auth.accesstoken })
            .then(function () {
                load();
            })
    }
})