angular.module("myapp").controller("ctctrl", function ($scope, remoteCallSvc) {

    $scope.Catagories = [];
    load();
    $scope.addflower = null;

    function load() {

        remoteCallSvc.get("http://dvents.azurewebsites.net/odata/Catagories", null, null)
            .then(function (result) {
                $scope.Catagories = result.data.value;
            })
    }

    $scope.save = function () {
        remoteCallSvc.post("http://dvents.azurewebsites.net/odata/Catagories", null, $scope.model.item)
            .then(function () {
                load();
            })
    }

    //$scope.edit = function (FoodID){
    //    remoteCallSvc.get("http://dvents.azurewebsites.net/odata/Catagories(" + FoodID + ")").then(function (data) {
    //        $scope.addflower = data.data;


    //        console.log(data);

    //    })
    //}

    //$scope.update = function () {
    //    console.log($scope.addmember)
    //    remoteCallSvc.put("http://localhost:7117/odata/Catagories(" + $scope.addfood.FoodID + ")", $scope.addfood).then(function (data) {
    //        load();
    //        console.log(data);
    //        clear();
    //    })
    //}

    $scope.delete = function (m) {
        remoteCallSvc.remove("http://dvents.azurewebsites.net/odata/Catagories(" + m + ")")
            .then(function () {
                load();
            })
    }
})