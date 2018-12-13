angular.module("myapp").controller("evctrl", function ($scope, remoteCallSvc) {

    $scope.Events = [];
    load();
    $scope.addflower = null;

    function load() {

        remoteCallSvc.get("http://dvents.azurewebsites.net/odata/Events", null, null)
            .then(function (result) {
                $scope.Events = result.data.value;
            })
    }

    $scope.save = function () {
        remoteCallSvc.post("http://dvents.azurewebsites.net/odata/Events", null, $scope.model.item)
            .then(function () {
                load();
            })
    }

    //$scope.edit = function (FoodID){
    //    remoteCallSvc.get("http://dvents.azurewebsites.net/odata/Events(" + FoodID + ")").then(function (data) {
    //        $scope.addflower = data.data;


    //        console.log(data);

    //    })
    //}

    //$scope.update = function () {
    //    console.log($scope.addmember)
    //    remoteCallSvc.put("http://localhost:7117/odata/Events(" + $scope.addfood.FoodID + ")", $scope.addfood).then(function (data) {
    //        load();
    //        console.log(data);
    //        clear();
    //    })
    //}

    $scope.delete = function (m) {
        remoteCallSvc.remove("http://dvents.azurewebsites.net/odata/Events(" + m + ")")
            .then(function () {
                load();
            })
    }
})