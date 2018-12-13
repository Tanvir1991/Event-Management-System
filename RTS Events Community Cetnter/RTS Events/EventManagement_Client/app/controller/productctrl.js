angular.module("myapp").controller("prctrl", function ($scope, remoteCallSvc, cart,$location) {

    //$scope.Products = [];
    load();
    $scope.addflower = null;
    $scope.Catagories = [];
    $scope.model = {};

    if ($scope.auth.authenticated)
    {  $scope.model.error = ''; }
    else
    {
        $location.path("/login");
    }


    $scope.CtgShow = function () {
        $("#ctgLink").show();
        $("#bkFrm").hide();
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

    $scope.save = function () {
       
        console.log($scope.model.item);
        console.log($scope.model.item.CatagoryId);
     
        remoteCallSvc.post("http://localhost:7117/odata/Products", { "Authorization": "Bearer " + $scope.auth.accesstoken }, $scope.model.item)
            .then(function () {
                
                $("#PrdModal").modal("hide");
                load();
                $scope.model.item = null;
            })
    } 

    $scope.delete = function (m) {
        remoteCallSvc.remove("http://localhost:7117/odata/Products(" + m + ")",{ "Authorization": "Bearer " + $scope.auth.accesstoken })
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