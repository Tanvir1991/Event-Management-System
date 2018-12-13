angular.module("myapp").controller("evctrl", function ($scope, remoteCallSvc, $location) {

    if ($scope.auth.authenticated)
    { $scope.model.error = ''; }
    else
    {
        $location.path("/login");
    }

    $scope.Events = [];
    load();
    $scope.addflower = null;

    $scope.showEvtForm = function () {
        $("#EvtModal").modal("show");
    };

    function load() {

        remoteCallSvc.get("http://localhost:7117/odata/Events", null, null)
            .then(function (result) {
                $scope.Events = result.data.value;
            })
    }

    $scope.save = function () {
        remoteCallSvc.post("http://localhost:7117/odata/Events", { "Authorization": "Bearer " + $scope.auth.accesstoken }, $scope.model.eitem)
            .then(function () {
                $("#EvtModal").modal("hide");
                load();
                $scope.model.eitem = null;
            })
    }

    $scope.delete = function (m) {
        remoteCallSvc.remove("http://localhost:7117/odata/Events(" + m + ")", { "Authorization": "Bearer " + $scope.auth.accesstoken })
            .then(function () {
                load();
            })
    }
})