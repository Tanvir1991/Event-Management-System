angular.module("myapp").controller("prctrl", function ($scope, remoteCallSvc, cart) {

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

    var selectedCategory = null;
    $scope.selectCategory = function (p) {
         selectedCategory = p.CatagoryName;
        
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




    function load() {

        remoteCallSvc.post("http://dvents.azurewebsites.net/odata/Products/GetCatagory", null, null)
            .then(function (result) {
                $scope.Products = result.data.value;
            }, function (err) {
                console.log(err)
            })
        //console.log($scope.Products)
    }

    function loadcatagory() {
        remoteCallSvc.get("http://dvents.azurewebsites.net/odata/Catagories", null, null)
          .then(function (result) {
              $scope.Catagories = result.data.value;
              console.log($scope.Catagories);
          })


    }
    loadcatagory()




    $scope.save = function () {
       
        console.log($scope.model.item);
        console.log($scope.model.item.CatagoryId);
     
        remoteCallSvc.post("http://dvents.azurewebsites.net/odata/Products", null, $scope.model.item)
            .then(function () {
                load();
            })
    }

    //$scope.edit = function (FoodID){
    //    remoteCallSvc.get("http://localhost:7117/odata/Products(" + FoodID + ")").then(function (data) {
    //        $scope.addflower = data.data;


    //        console.log(data);

    //    })
    //}

    //$scope.update = function () {
    //    console.log($scope.addmember)
    //    remoteCallSvc.put("http://localhost:7117/odata/Products(" + $scope.addfood.FoodID + ")", $scope.addfood).then(function (data) {
    //        load();
    //        console.log(data);
    //        clear();
    //    })
    //}





    $scope.delete = function (m) {
        remoteCallSvc.remove("http://dvents.azurewebsites.net/odata/Products(" + m + ")")
            .then(function () {
                load();
            })
    }

    $scope.pictureClick = function () {
        fileSelect = document.createElement('input');
        fileSelect.type = 'file';
        if (fileSelect.disabled) {
            return;
        }
        if (fileSelect) {
            fileSelect.click();
        }
        fileSelect.onchange = function () {
            var f = fileSelect.files[0],
              r = new FileReader();
            r.onloadend = function (e) {
                $scope.model.item.Picture = e.target.result;
                $scope.$apply();
                $("#selectedPrictrue").attr("src", $scope.model.item.Picture)
            }
            r.readAsDataURL(f);
        }
    }
})