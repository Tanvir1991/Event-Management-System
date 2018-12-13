angular.module("myapp").controller("orctrl", function ($scope, remoteCallSvc) {

  



    $scope.BookingDetails = [];
    load();
    $scope.addflower = null;



     var selectedCategory = null;
    $scope.selectCategory = function (p) {
         selectedCategory = p.EventDate;
         $("#OrderDetails").show();
    }
    $scope.filterProductFn = function (p) {

        return selectedCategory == null || selectedCategory == p.EventDate;
        console.log(p);       

    }
  
    $scope.activeCategory = function (p) {
        return selectedCategory == p.EventDate ? 'active' : "";
        console.log("clicked");
       
    }





  

    function load() {
        remoteCallSvc.get("http://localhost:7117/odata/BookingDetails", null, null)
            .then(function (result) {
                $scope.BookingDetails = result.data.value;
            })
    }
})