angular.module("myapp").controller("bkctrl", function ($scope, remoteCallSvc, cart) {

    $scope.BookingDetails = null;
    $scope.CtgShow = function () {
        $("#ctgLink").show();
        $("#bkFrm").hide();
    }



    //$scope.Products = [];
    load();
    $scope.addflower = null;
    $scope.Catagories = [];
    $scope.model = {};



    //$scope.addtocart = function (product) {
    //    cart.add(product.ID, product.Name, product.Price);
    //    //console.log(cart.getItems());
    //    //console.log(product);



    //}
    function getEvtDate(date)
    {
        var today = new Date(date);
        var todayDate = today.getDate()
        var todayMonth = today.getMonth() + 1;
        var todayYear = today.getFullYear();
        var todayHour = today.getHours();
        var todayMinutes = today.getMinutes();
        if (todayHour < 10) {
            todayHour = '0' + todayHour;
        }
        if (todayMinutes < 10) {
            todayMinutes = '0' + todayMinutes;
        }

        if (todayDate < 10) {
            todayDate = '0' + todayDate;
        }
        if (todayMonth < 10) {
            todayMonth = '0' + todayMonth;
        }

     return   today = todayYear + '-' + todayMonth + '-' + todayDate;
    }
    
    $scope.CtgShow = function () {
        //if ($scope.EventId == $scope.Guest) {
        //    alert("Sorry, the date has already booked.");
        //}
        var edate = getEvtDate($scope.EDate);
        if ($scope.EDate != null & $scope.EventId != null & $scope.Guest != null) {
            
    

            for (var i = 0; i < $scope.BookingDetails.length; i++) {
                var d = getEvtDate($scope.BookingDetails[i].EventDate);
               
               
                if (edate == d) {
                    //alert("Sorry, this date has already booked.");
                    //location.reload();
                    $scope.msg = "Sorry, this date has already booked.";
                    $("#ctgLink").hide();
                    console.log($scope.msg);
                    $("#bkFrm").show();
                    return;
                }
                else {
                    $("#ctgLink").show();
                    $("#bkFrm").hide();
                }

            }
            
        }
       

            //else if (evLeft.value == $scope.evRight) {
            //    alert("Sorry, the date has already booked.");
            //}

        else {
            //alert("You must fill up all the requierd information.");
            $scope.msg1 = "You must fill up all the requierd information.";

           
        }
        
        console.log($scope.EDate);
        console.log($scope.evRight);
    }

    $scope.dtShow = function () {
        
        $("#evDate").show();
        $("#btnHide").show();
        $("#btnShow").hide();
    }

    $scope.dtHide = function () {

        $("#evDate").hide();
        $("#btnHide").hide();
        $("#btnShow").show();
    }

    var selectedCategory = null;
    $scope.selectCategory = function (p) {
        selectedCategory = p.CatagoryName;
        $("#bkview").show();
    }
    $scope.filterProductFn = function (p) {

        return selectedCategory == null || selectedCategory == p.Catagory;
        console.log(p);



    }

    $scope.activeCategory = function (p) {
        return selectedCategory == p.CatagoryName ? 'active' : "";
        console.log("clicked");

    }
    $scope.addtocart = function (product) {
        cart.add(product.ProductId, product.ProductName, product.ProductCost, selectedCategory,
            $scope.Guest, $scope.EDate.toString(""), $scope.EventId);
        console.log(cart.getItems());
        console.log(selectedCategory);
        //console.log(product);

    }

    $scope.showPrdForm = function () {
        $("#PrdModal").modal("show");
    };


    function load() {

        remoteCallSvc.post("http://localhost:7117/odata/Products/GetCatagory", null, null)
            .then(function (result) {
                $scope.Products = result.data.value;
            }, function (err) {
                console.log(err)
            })
        //console.log($scope.Products)
    }

    function loadcatagory() {
        remoteCallSvc.get("http://localhost:7117/odata/Catagories", null, null)
          .then(function (result) {
              $scope.Catagories = result.data.value;
              console.log($scope.Catagories);
          })


    }
    loadcatagory()

    remoteCallSvc.get("http://localhost:7117/odata/Catagories", null, null)
       .then(function (result) {
           $scope.Catagories = result.data.value;
       })

    remoteCallSvc.get("http://localhost:7117/odata/Events", null, null)
           .then(function (result) {
               $scope.Events = result.data.value;
           })


    remoteCallSvc.get("http://localhost:7117/odata/BookingDetails", null, null)
        .then(function (result) {
            $scope.BookingDetails = result.data.value;
        })

})